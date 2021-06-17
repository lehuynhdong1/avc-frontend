import { LabelImageFile, Labels, LabelTypes } from '../models';
import { stringifyBox } from './stringify-label-image';

export function imageToString({ annotations, adcImage }: LabelImageFile): string {
  if (!annotations) return '';
  const annotationStrings = annotations.map(({ target, body }) => {
    const boxInString = target.selector.value;
    const tag = body[0].value.toUpperCase() as LabelTypes;
    const label = Labels[tag];
    return `${stringifyBox(boxInString, label, {
      width: adcImage.width,
      height: adcImage.height
    })}`;
  });
  return annotationStrings.join('\n');
}
