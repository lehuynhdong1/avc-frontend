import { LabelImageFile } from '../models/image-dialog.model';
import { stringifyBox, Labels, LabelTypes } from './stringify-label-image';

export function imageToString({ annotations, adcImage }: LabelImageFile): string {
  if (!annotations) return '';
  const annotationStrings = annotations.map(({ target, body }) => {
    const boxInString = target.selector.value;
    const tag = body[0].value.toUpperCase() as LabelTypes;
    const label = Labels[tag];
    console.log(
      '🚀 ~ file: image-to-string.ts ~ line 8 ~ annotations.forEach ~ label',
      body[0].value
    );
    console.log('🚀 ~ file: image-to-string.ts ~ line 8 ~ annotations.forEach ~ label', label);
    return `${stringifyBox(boxInString, label, {
      width: adcImage.width,
      height: adcImage.height
    })}`;
  });
  console.log('This run first ===========');

  return annotationStrings.join('\n');
}
