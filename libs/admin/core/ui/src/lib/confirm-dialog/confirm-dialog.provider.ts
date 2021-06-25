import { Provider } from '@angular/core';
import { TUI_DIALOGS } from '@taiga-ui/cdk';
import { Injectable } from '@angular/core';
import { AbstractTuiDialogService } from '@taiga-ui/cdk';
import { ConfirmDialogComponentParams, ConfirmDialogComponent } from './confirm-dialog.component';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';

@Injectable({ providedIn: 'root' })
export class ConfirmTuiDialogService extends AbstractTuiDialogService<ConfirmDialogComponentParams> {
  readonly defaultOptions = {
    content: 'Simple default content'
  } as const;
  readonly component = new PolymorpheusComponent(ConfirmDialogComponent);
}

export const CONFIRM_DIALOG_PROVIDER: Provider = {
  provide: TUI_DIALOGS,
  useExisting: ConfirmTuiDialogService,
  multi: true
};
