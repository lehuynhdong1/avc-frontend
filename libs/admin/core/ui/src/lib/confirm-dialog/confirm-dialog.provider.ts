import { Provider } from '@angular/core';
import { TUI_DIALOGS } from '@taiga-ui/cdk';
import { ConfirmDialogService } from './confirm-dialog.service';

export const CONFIRM_DIALOG_PROVIDER: Provider = {
  provide: TUI_DIALOGS,
  useExisting: ConfirmDialogService,
  multi: true
};
