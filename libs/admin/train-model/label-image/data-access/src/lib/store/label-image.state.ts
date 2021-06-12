import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store, createSelector } from '@ngxs/store';
import { INITIAL_STATE, StateModel, STATE_NAME } from './label-image-state.model';
import { LabelImageById, SetSelectedImageId, TransferUploadedImages } from './label-image.actions';
import {
  UploadImageState,
  StateModel as UploadImageStateModel
} from '@admin/train-model/upload-image/data-access';
import { encodeDataUrl } from '@admin/train-model/label-image/util';
import { patch } from '@rx-angular/state';

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
  constructor(private store: Store) {}

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
        [image.id]: { id: image.id, dataUrl: encodedDataUrlImages[index] }
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
}
