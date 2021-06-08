import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { INITIAL_STATE, StateModel, STATE_NAME, encodeDataUrl } from './label-image-state.model';
import { TransferUploadedImages } from './label-image.actions';
import { UploadImageState } from '@admin/train-model/upload-image/data-access';

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
}
