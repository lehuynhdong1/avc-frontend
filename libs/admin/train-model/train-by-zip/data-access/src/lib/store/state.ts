import { saveAs } from 'file-saver';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { INITIAL_STATE, StateModel, STATE_NAME, ACCEPTED_FOLDER_NAMES } from './state.model';
import { UpdateZip, DownloadClassesTxt, Train } from './actions';
import * as JSZip from 'jszip';
import * as prettyBytes from 'pretty-bytes';
import { labels } from '@admin/train-model/train-by-images/util';
import { ModelService } from '@shared/api';

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

  constructor(private modelService: ModelService) {}

  @Action(UpdateZip)
  async updateZip({ patchState }: StateContext<StateModel>, { file }: UpdateZip) {
    if (!file) patchState({ uploadedZip: undefined });
    if (file.type !== 'application/zip') {
      const errorMessage = `${file.name} (${prettyBytes(file.size)}) must be in ZIP type`;
      patchState({ errorMessage });
      throw new Error(errorMessage);
    }
    const zip = await JSZip.loadAsync(file);
    const fileNames = Object.keys(zip.files);

    const isValid = Object.keys(zip.files).every((filename) => {
      const folderFirstClass = filename.slice(0, filename.indexOf('/'));
      return ACCEPTED_FOLDER_NAMES.includes(folderFirstClass);
    });
    if (!isValid) {
      const errorMessage = `${file.name} (${prettyBytes(
        file.size
      )}) Structure of ZIP file is not appropriate. Please edit an try again.`;
      patchState({ errorMessage });
      throw new Error(errorMessage);
    }

    const imageCount = fileNames.filter((fileName) => fileName.includes('imgs/')).length - 1; // substract 1 for the folder
    patchState({ uploadedZip: { file, imageCount } });
  }

  @Action(DownloadClassesTxt)
  downloadClassesTxt() {
    const file = new Blob([labels.join('\n')]);
    return saveAs(file, 'classes.txt');
  }

  @Action(Train)
  train({ patchState, getState }: StateContext<StateModel>) {
    const { uploadedZip } = getState();
    if (!uploadedZip) {
      const errorMessage = 'You do not have any uploaded ZIP to train';
      patchState({ errorMessage });
      throw new Error(errorMessage);
    }
    return this.modelService.apiModelPost({
      zipFile: uploadedZip.file,
      name: `Trained by ZIP "${uploadedZip.file.name}"`,
      imageCount: uploadedZip.imageCount
    });
  }
}
