import { Injectable } from '@angular/core';
import { AbstractTuiDialogService } from '@taiga-ui/cdk';
import { ImageDialogComponent } from './image-dialog.component';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { SelectedLabelImageFile } from '@admin/train-model/train-by-images/util';

@Injectable({ providedIn: 'root' })
export class ImageDialogService extends AbstractTuiDialogService<SelectedLabelImageFile> {
  readonly defaultOptions = {
    id: 'null',
    name: 'Simple default content',
    adcImage: {
      width: 100,
      height: 100,
      dataUrl: '',
      mimeType: ''
    }
  } as const;
  readonly component = new PolymorpheusComponent(ImageDialogComponent);
}
