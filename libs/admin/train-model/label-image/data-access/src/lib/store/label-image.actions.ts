import { STATE_NAME } from './label-image-state.model';

const ACTIONS = {
  TRANSFER_UPLOADED_IMAGES: `[${STATE_NAME}] Transfer uploaded images from `
};

export class TransferUploadedImages {
  static readonly type = ACTIONS.TRANSFER_UPLOADED_IMAGES;
}
