import { STATE_NAME } from './state.model';
import { Annotations } from '@admin/train-model/train-by-images/util';

const ACTIONS = {
  UPDATE_IMAGES: `[${STATE_NAME}] Update images`,
  TRANSFER_UPLOADED_IMAGES: `[${STATE_NAME}] Transfer uploaded images from Upload Image Page`,
  SET_SELECTED_IMAGE_ID: `[${STATE_NAME}] Set selected image id`,
  LABEL_IMAGE_BY_ID: `[${STATE_NAME}] Label image by ID`,
  DONWLOAD_LABEL_FILES: `[${STATE_NAME}] Download label files.`
};

export class UpdateImages {
  static readonly type = ACTIONS.UPDATE_IMAGES;
  constructor(public readonly files: ReadonlyArray<File>) {}
}
export class TransferUploadedImages {
  static readonly type = ACTIONS.TRANSFER_UPLOADED_IMAGES;
}

export class SetSelectedImageId {
  static readonly type = ACTIONS.SET_SELECTED_IMAGE_ID;
  constructor(public readonly id: string) {}
}

export class LabelImageById {
  static readonly type = ACTIONS.LABEL_IMAGE_BY_ID;
  constructor(public readonly id: string, public readonly annotations: Annotations) {}
}

export class DonwloadLabelFiles {
  static readonly type = ACTIONS.DONWLOAD_LABEL_FILES;
}
