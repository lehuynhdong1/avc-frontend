import { Pipe, PipeTransform } from '@angular/core';
import { encodeDataUrl } from '../helpers';

@Pipe({ name: 'dataUrl' })
export class DataUrlPipe implements PipeTransform {
  transform(file: File): Promise<string> {
    return encodeDataUrl(file);
  }
}
