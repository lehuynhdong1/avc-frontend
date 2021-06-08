import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { ShowNotification } from '@shared/auth/util';
import { TuiNotification } from '@taiga-ui/core';
import {
  ImageFile,
  INITIAL_STATE,
  preCheckFile,
  StateModel,
  STATE_NAME
} from './label-image-state.model';
import { UpdateImages } from './label-image.actions';
import * as prettyBytes from 'pretty-bytes';
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
    console.log(
      '🚀 ~ file: label-image.state.ts ~ line 39 ~ LabelImageState ~ updateImages ~ acceptedFiles',
      acceptedFiles
    );
    patchState({ images: acceptedFiles });
    rejectedFiles.forEach(({ file, error }) =>
      dispatch(
        new ShowNotification({
          message: `${file.name} (${prettyBytes(file.size)}) ${error}`,
          options: { label: 'Invalid File', status: TuiNotification.Error }
        })
      )
    );
  }
}
