import { Injectable } from '@angular/core';
import { AbstractTuiDialogService } from '@taiga-ui/cdk';
import { ImageDialogComponent } from './image-dialog.component';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { ImageDialogParams } from '@admin/train-model/label-image/util';

@Injectable({ providedIn: 'root' })
export class ImageDialogService extends AbstractTuiDialogService<ImageDialogParams> {
  readonly defaultOptions = {
    id: 'null',
    name: 'Simple default content',
    dataUrl: 'base64'
  } as const;
  readonly component = new PolymorpheusComponent(ImageDialogComponent);
}
