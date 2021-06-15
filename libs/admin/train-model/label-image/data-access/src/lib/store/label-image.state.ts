import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store, createSelector } from '@ngxs/store';
import { INITIAL_STATE, StateModel, STATE_NAME } from './label-image-state.model';
import {
  LabelImageById,
  SetSelectedImageId,
  TransferUploadedImages,
  DonwloadLabelFiles
} from './label-image.actions';
import {
  UploadImageState,
  StateModel as UploadImageStateModel
} from '@admin/train-model/upload-image/data-access';
import { encodeDataUrl, imageToString } from '@admin/train-model/label-image/util';
import { dictionaryToArray, patch } from '@rx-angular/state';
import { saveAs } from 'file-saver'
import * as JSZip from 'jszip';
@State<StateModel>({
  name: STATE_NAME,
  defaults: INITIAL_STATE
})
@Injectable()
export class LabelImageState {
  @Selector()
  static images({ images }: StateModel) {
    return images;
  }

  static selectedImage() {
    return createSelector(
      [UploadImageState, LabelImageState],
      (uploadState: UploadImageStateModel, labelState: StateModel) => {
        const { images, selectedImageId } = labelState;
        const imageFile = uploadState.images.find((image) => image.id === selectedImageId);
        return selectedImageId ? { ...images[selectedImageId], name: imageFile?.file.name } : null;
      }
    );
  }
  constructor(private store: Store) { }

  @Action(TransferUploadedImages)
  async transferUploadedImages({ patchState, getState }: StateContext<StateModel>) {
    const images = this.store.selectSnapshot(UploadImageState.images);
    if (!images) return;
    const encodedDataUrlImages = await Promise.all(
      images.map((image) => encodeDataUrl(image.file))
    );
    let imagesObjectMap = getState().images;
    for (let index = 0; index < images.length; index++) {
      const image = images[index];
      imagesObjectMap = {
        ...imagesObjectMap,
        [image.id]: { id: image.id, adcImage: encodedDataUrlImages[index] }
      };
    }
    patchState({ images: imagesObjectMap });
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
    const { images } = getState();
    const image = images[id];
    if (!image) return;
    const imageWithNewAnnotations = patch(image, { annotations });
    patchState({ images: patch(images, { [id]: imageWithNewAnnotations }) });
  }

  @Action(DonwloadLabelFiles) downloadLabelFiles({ getState }: StateContext<StateModel>) {
    const { images } = getState();
    const imagesArray = dictionaryToArray(images);
    const zip = new JSZip()
    imagesArray.forEach((image) => {
      const imageFile = this.store.selectSnapshot(UploadImageState.getImageById(image.id));
      const imagesFolder = zip.folder("images")
      const labelsFolder = zip.folder("labels");
      const extension = image.adcImage.mimeType.slice(image.adcImage.mimeType.indexOf('/') + 1)
      if (imageFile?.file) imagesFolder?.file(`${image.id}.${extension}`, imageFile?.file)
      labelsFolder?.file(`${image.id}.txt`, imageToString(image))
    });
    const now = new Date().toISOString();
    return zip.generateAsync({ type: 'blob' }).then(zipFile => saveAs(zipFile, now + '.zip'))
  }
}
