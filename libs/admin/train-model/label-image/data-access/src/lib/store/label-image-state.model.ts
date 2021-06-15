import { LabelImageFile } from '@admin/train-model/label-image/util';

export const STATE_NAME = 'Admin_TrainModel_LabelImage';
export const INITIAL_STATE: StateModel = { images: {}, selectedImageId: null };

export interface StateModel {
  images: {
    [id: string]: LabelImageFile;
  };
  selectedImageId: string | null;
}
