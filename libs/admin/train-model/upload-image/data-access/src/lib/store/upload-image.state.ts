import { Injectable } from '@angular/core';
import { Action, createSelector, Selector, State, StateContext } from '@ngxs/store';
import { ShowNotification } from '@shared/auth/util';
import { TuiNotification } from '@taiga-ui/core';
import {
  ImageFile,
  INITIAL_STATE,
  preCheckFile,
  StateModel,
  STATE_NAME
} from './upload-image-state.model';
import { UpdateImages } from './upload-image.actions';
import * as prettyBytes from 'pretty-bytes';

@State<StateModel>({
  name: STATE_NAME,
  defaults: INITIAL_STATE
})
@Injectable()
export class UploadImageState {
  @Selector()
  static images({ images }: StateModel) {
    return images;
  }

  static getImageById(id: string) {
    return createSelector([UploadImageState], (state: StateModel) =>
      state.images.find((image) => image.id === id)
    );
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
    patchState({ images: acceptedFiles });
    rejectedFiles.forEach(({ file, error }) =>
      dispatch(
        new ShowNotification({
          message: `${file.name} (${prettyBytes(file.size)}) ${error}`,
          options: { label: 'Oops! Invalid Image', status: TuiNotification.Error }
        })
      )
    );
  }
}
