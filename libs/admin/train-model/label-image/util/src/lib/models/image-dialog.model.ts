import { AdcImage } from './adc-image.model';
import { Annotations } from './annotation.model';

export interface LabelImageFile {
  id: string;
  adcImage: AdcImage;
  annotations?: Annotations;
}

export interface SelectedLabelImageFile extends LabelImageFile {
  name: string;
}
export interface ImageDialog {
  annotations: Annotations;
}
