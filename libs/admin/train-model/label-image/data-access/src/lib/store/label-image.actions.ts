import { STATE_NAME } from './label-image-state.model';
import { Annotations } from '@admin/train-model/label-image/util';

const ACTIONS = {
  TRANSFER_UPLOADED_IMAGES: `[${STATE_NAME}] Transfer uploaded images from Upload Image Page`,
  SET_SELECTED_IMAGE_ID: `[${STATE_NAME}] Set selected image id`,
  LABEL_IMAGE_BY_ID: `[${STATE_NAME}] Label image by ID`
};

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
