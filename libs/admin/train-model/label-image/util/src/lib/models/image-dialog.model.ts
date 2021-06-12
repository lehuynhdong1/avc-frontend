import { Annotations } from './annotation.model';
import { LabelImageFile } from '@admin/train-model/label-image/data-access';

export interface ImageDialogParams extends LabelImageFile {
  name: string;
}

export interface ImageDialog {
  annotations: Annotations;
}
