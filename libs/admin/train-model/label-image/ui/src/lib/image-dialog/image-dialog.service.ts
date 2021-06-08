import { Injectable } from '@angular/core';
import { AbstractTuiDialogService } from '@taiga-ui/cdk';
import { ImageDialogComponentParams, ImageDialogComponent } from './image-dialog.component';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

@Injectable({ providedIn: 'root' })
export class ImageDialogService extends AbstractTuiDialogService<ImageDialogComponentParams> {
  readonly defaultOptions = {
    name: 'Simple default content',
    dataUrl: 'base64'
  } as const;
  readonly component = new PolymorpheusComponent(ImageDialogComponent);
}
