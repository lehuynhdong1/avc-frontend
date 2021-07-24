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
  static uploadProgress({ uploadProgress }: StateModel) {
    return uploadProgress;
  }
  @Selector()
  static errorMessage({ errorMessage }: StateModel) {
    return errorMessage;
  }

  constructor(private modelService: ModelService) {}

  @Action(UpdateZip)
  async updateZip({ patchState }: StateContext<StateModel>, { file }: UpdateZip) {
    if (!file) return patchState({ uploadedZip: undefined });
    if (!file.name.endsWith('.zip')) {
      const errorMessage = `${file.name} (${prettyBytes(file.size)}) must be in ZIP type`;
      patchState({ errorMessage, uploadedZip: undefined });
      throw new Error(errorMessage);
    }
    const zip = await JSZip.loadAsync(file);
    const fileNames = Object.keys(zip.files);

    const isFolderValid = ACCEPTED_FOLDER_NAMES.every((acceptedFolderName) =>
      fileNames.some((filename) => filename.includes(acceptedFolderName))
    );

    let isClassesTxtValid = false;
    let imageCount = 0;
    for (const fileName of Object.keys(zip.files)) {
      if (fileName.includes('labels/classes.txt')) isClassesTxtValid = true;
      if (fileName.match(/(.+)?imgs\/.+/)) imageCount++;
    }
    if (!imageCount) {
      const errorMessage = `${file.name} (${prettyBytes(
        file.size
      )}) There's no image in "imgs" folder. Please edit an try again.`;
      patchState({ errorMessage, uploadedZip: undefined });
      throw new Error(errorMessage);
    }
    if (!isFolderValid || !isClassesTxtValid) {
      const errorMessage = `${file.name} (${prettyBytes(
        file.size
      )}) Structure of ZIP file is not appropriate. Please edit an try again.`;
      patchState({ errorMessage, uploadedZip: undefined });
      throw new Error(errorMessage);
    }
    return patchState({ uploadedZip: { file, imageCount } });
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
    const fileNameWithoutExtension = uploadedZip.file.name.slice(
      0,
      uploadedZip.file.name.length - 4
    );
    return this.modelService.apiModelPost({
      zipFile: uploadedZip.file,
      name: `Trained by ZIP - ${fileNameWithoutExtension}`,
      imageCount: uploadedZip.imageCount
    });
    // .pipe(
    //   throttleTime(300),
    //   tap((event) => {
    //     if (event.type === HttpEventType.UploadProgress) {
    //       const { loaded, total } = event;
    //       console.log(event);

    //       patchState({ uploadProgress: { loaded, total } });
    //     }
    //   })
    // );
  }
}
