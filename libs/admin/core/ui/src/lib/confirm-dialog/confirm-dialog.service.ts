import { Injectable } from '@angular/core';
import { AbstractTuiDialogService } from '@taiga-ui/cdk';
import { ConfirmDialogComponentParams, ConfirmDialogComponent } from './confirm-dialog.component';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

@Injectable({ providedIn: 'root' })
export class ConfirmDialogService extends AbstractTuiDialogService<ConfirmDialogComponentParams> {
  readonly defaultOptions = {
    content: 'Simple default content'
  } as const;
  readonly component = new PolymorpheusComponent(ConfirmDialogComponent);
}
