import { STATE_NAME } from './state.model';

const ACTIONS = {
  UPDATE_ZIP: `[${STATE_NAME}] Upload zip`,
  DOWNLOAD_CLASSES_TXT: `[${STATE_NAME}] Download classes.txt`,
  TRAIN: `[${STATE_NAME}] Train`
};

export class UpdateZip {
  static readonly type = ACTIONS.UPDATE_ZIP;
  constructor(public readonly file: File) {}
}

export class DownloadClassesTxt {
  static readonly type = ACTIONS.DOWNLOAD_CLASSES_TXT;
}

export class Train {
  static readonly type = ACTIONS.TRAIN;
}
