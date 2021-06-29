import { Pipe, PipeTransform } from '@angular/core';
import { encodeDataUrl } from '../helpers';

@Pipe({ name: 'dataUrl' })
export class DataUrlPipe implements PipeTransform {
  transform(file: File | string): Promise<string> {
    if (typeof file === 'string') return Promise.resolve(file);
    return encodeDataUrl(file);
  }
}
