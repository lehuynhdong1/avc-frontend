import { TuiNotification } from '@taiga-ui/core';
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
import { encodeDataUrl, imageToString } from '@admin/train-model/train-by-images/util';
import { deleteProp, dictionaryToArray, patch, remove } from '@rx-angular/state';
import { saveAs } from 'file-saver';
import * as JSZip from 'jszip';
import { ShowNotification } from '@shared/util';
import * as prettyBytes from 'pretty-bytes';

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

  @Action(UpdateImages)
  updateImages({ patchState, dispatch }: StateContext<StateModel>, { files }: UpdateImages) {
    const acceptedFiles: ImageFile[] = [];
    const rejectedFiles: { file: File; error: string }[] = [];
    for (const file of files) {
      const currentIds = acceptedFiles.map((imgFile) => imgFile.id);
      const { id, error } = preCheckFile(file, currentIds);
      if (error) {
        rejectedFiles.push({ file, error });
      }
      if (id) acceptedFiles.push({ id, file });
    }
    patchState({ uploadedImages: acceptedFiles });
    rejectedFiles.forEach(({ file, error }) =>
      dispatch(
        new ShowNotification({
          message: `${file.name} (${prettyBytes(file.size)}) ${error}`,
          options: { label: 'Oops! Invalid Image', status: TuiNotification.Error }
        })
      )
    );
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
    patchState({ labelledImages });
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
    patchState({ labelledImages: patch(labelledImages, { [id]: imageWithNewAnnotations }) });
  }

  @Action(DonwloadLabelFiles)
  async downloadLabelFiles({ getState }: StateContext<StateModel>) {
    const { labelledImages, uploadedImages } = getState();
    const labelledImagesArray = dictionaryToArray(labelledImages);
    const zip = new JSZip();
    labelledImagesArray.forEach((image) => {
      const imageFile = uploadedImages.find((img) => img.id === image.id);
      const labelledImagesFolder = zip.folder('labelledImages');
      const labelsFolder = zip.folder('labels');
      const extension = image.adcImage.mimeType.slice(image.adcImage.mimeType.indexOf('/') + 1);
      if (imageFile?.file) labelledImagesFolder?.file(`${image.id}.${extension}`, imageFile?.file);
      labelsFolder?.file(`${image.id}.txt`, imageToString(image));
    });
    const now = new Date().toISOString();
    const zipFile = await zip.generateAsync({ type: 'blob' });
    return saveAs(zipFile, now + '.zip');
  }
}
