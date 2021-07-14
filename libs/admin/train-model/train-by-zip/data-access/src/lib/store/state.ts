import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { INITIAL_STATE, StateModel, STATE_NAME, ACCEPTED_FOLDER_NAMES } from './state.model';
import { UpdateZip } from './actions';
import * as JSZip from 'jszip';
import * as prettyBytes from 'pretty-bytes';

@State<StateModel>({
  name: STATE_NAME,
  defaults: INITIAL_STATE
})
@Injectable()
export class TrainByZipState {
  @Selector()
  static uploadedZip({ uploadedZip }: StateModel) {
    return uploadedZip;
  }
  @Selector()
  static errorMessage({ errorMessage }: StateModel) {
    return errorMessage;
  }

  @Action(UpdateZip)
  async updateZip({ patchState }: StateContext<StateModel>, { file }: UpdateZip) {
    if (file.type !== 'application/zip') {
      const errorMessage = `${file.name} (${prettyBytes(file.size)}) must be in ZIP type`;
      patchState({ errorMessage });
      throw new Error(errorMessage);
    }
    const zip = await JSZip.loadAsync(file);
    const isInvalid = Object.keys(zip.files).some(
      (filename) => !ACCEPTED_FOLDER_NAMES.includes(filename)
    );
    if (isInvalid) {
      const errorMessage = `${file.name} (${prettyBytes(
        file.size
      )}) Structure of ZIP file is not appropriate. Please edit an try again.`;
      patchState({ errorMessage });
      throw new Error(errorMessage);
    }
    patchState({ uploadedZip: file });
  }
}
