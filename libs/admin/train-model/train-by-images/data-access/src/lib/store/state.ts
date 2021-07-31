import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { INITIAL_STATE, StateModel, STATE_NAME, ImageFile, preCheckFile } from './state.model';
import {
  LabelImageById,
  SetSelectedImageId,
  TransferUploadedImages,
  DonwloadLabelFiles,
  UpdateImages
} from './actions';
import { encodeDataUrl, imageToString, labels } from '@admin/train-model/train-by-images/util';
import { deleteProp, dictionaryToArray, patch, remove } from '@rx-angular/state';
import { saveAs } from 'file-saver';
import * as JSZip from 'jszip';
import { ConvertToZip, Train } from './actions';
import { switchMap, tap, map } from 'rxjs/operators';
import { ModelService } from '@shared/api';
import { hasValue, stringifyDate } from '@shared/util';

@State<StateModel>({
  name: STATE_NAME,
  defaults: INITIAL_STATE
})
@Injectable()
export class TrainByImagesState {
  @Selector()
  static uploadedImages({ uploadedImages }: StateModel) {
    return uploadedImages;
  }
  @Selector()
  static rejectedFiles({ rejectedFiles }: StateModel) {
    return rejectedFiles;
  }
  @Selector()
  static labelledImages({ labelledImages }: StateModel) {
    return labelledImages;
  }

  @Selector()
  static selectedImage({ labelledImages, uploadedImages, selectedImageId }: StateModel) {
    const imageFile = uploadedImages.find((image) => image.id === selectedImageId);
    return selectedImageId
      ? { ...labelledImages[selectedImageId], name: imageFile?.file.name }
      : null;
  }

  constructor(private modelService: ModelService) {}

  @Action(UpdateImages)
  updateImages({ patchState }: StateContext<StateModel>, { files }: UpdateImages) {
    const acceptedFiles: ImageFile[] = [];
    const rejectedFiles: StateModel['rejectedFiles'] = [];
    for (const file of files) {
      const currentIds = acceptedFiles.map((imgFile) => imgFile.id);
      const { id, error } = preCheckFile(file, currentIds);
      if (error) {
        rejectedFiles.push({ file, error });
      }
      if (id) acceptedFiles.push({ id, file });
    }
    patchState({ uploadedImages: acceptedFiles, rejectedFiles, zipFile: null });
    if (rejectedFiles.length > 0) throw new Error('Some files miss match');
  }

  @Action(TransferUploadedImages)
  async transferUploadedImages({ patchState, getState }: StateContext<StateModel>) {
    const { uploadedImages } = getState();
    if (!uploadedImages) return;
    const encodedDataUrlImages = await Promise.all(
      uploadedImages.map((image) => encodeDataUrl(image.file))
    );
    let { labelledImages } = getState();
    let removedImageIds = Object.keys(labelledImages);
    for (let index = 0; index < uploadedImages.length; index++) {
      const image = uploadedImages[index];
      removedImageIds = remove(removedImageIds, image.id);
      if (labelledImages[image.id] === undefined) {
        labelledImages = {
          ...labelledImages,
          [image.id]: { id: image.id, adcImage: encodedDataUrlImages[index] }
        };
      }
    }
    for (const removedId of removedImageIds) {
      labelledImages = deleteProp(labelledImages, removedId);
    }
    patchState({ labelledImages, zipFile: null });
  }

  @Action(SetSelectedImageId)
  setSelectedImageId({ patchState }: StateContext<StateModel>, { id }: SetSelectedImageId) {
    patchState({ selectedImageId: id });
  }

  @Action(LabelImageById)
  labelImageById(
    { patchState, getState }: StateContext<StateModel>,
    { id, annotations }: LabelImageById
  ) {
    const { labelledImages } = getState();
    const image = labelledImages[id];
    if (!image) return;
    const imageWithNewAnnotations = patch(image, { annotations });
    patchState({
      labelledImages: patch(labelledImages, { [id]: imageWithNewAnnotations }),
      zipFile: null
    });
  }

  @Action(DonwloadLabelFiles)
  downloadLabelFiles({ getState, dispatch }: StateContext<StateModel>) {
    const { zipFile } = getState();
    const now = new Date().toISOString();
    if (zipFile) return saveAs(zipFile, now + '.zip');
    return dispatch(new ConvertToZip())
      .pipe(
        map(() => getState().zipFile),
        hasValue()
      )
      .pipe(tap((zip) => saveAs(zip, now + '.zip')));
  }

  @Action(ConvertToZip)
  async ConvertToZip({ getState, patchState }: StateContext<StateModel>) {
    const { labelledImages, uploadedImages } = getState();
    const labelledImagesArray = dictionaryToArray(labelledImages);
    const zip = new JSZip();
    labelledImagesArray.forEach((image, index) => {
      const imageFile = uploadedImages.find((img) => img.id === image.id);
      const labelledImagesFolder = zip.folder('imgs');
      const labelsFolder = zip.folder('labels');
      const extension = image.adcImage.mimeType.slice(image.adcImage.mimeType.indexOf('/') + 1);
      if (imageFile?.file) labelledImagesFolder?.file(`${image.id}.${extension}`, imageFile?.file);
      labelsFolder?.file(`${image.id}.txt`, imageToString(image));
      if (index === 0) labelsFolder?.file('classes.txt', labels.join('\n'));
    });
    const zipFile = await zip.generateAsync({ type: 'blob' });
    patchState({ zipFile });
  }

  @Action(Train)
  train({ dispatch, getState, patchState }: StateContext<StateModel>) {
    const { zipFile, uploadedImages } = getState();
    const imageCount = uploadedImages.length;
    const now = new Date();
    if (zipFile)
      return this.modelService.apiModelPost({
        imageCount,
        zipFile,
        name: `Trained by Images - ${stringifyDate(now)}`
      });
    return dispatch(new ConvertToZip())
      .pipe(
        map(() => getState().zipFile),
        hasValue()
      )
      .pipe(
        switchMap((zip) =>
          this.modelService.apiModelPost({
            imageCount,
            zipFile: zip,
            name: `Trained by Images - ${stringifyDate(now)}`
          })
        ),
        tap(() => patchState(INITIAL_STATE))
      );
  }
}
