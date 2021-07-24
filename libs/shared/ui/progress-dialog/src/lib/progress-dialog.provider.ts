import { Provider } from '@angular/core';
import { TUI_DIALOGS } from '@taiga-ui/cdk';
import { ProgressDialogService } from './progress-dialog.service';

export const PROGRESS_DIALOG_PROVIDER: Provider = {
  provide: TUI_DIALOGS,
  useExisting: ProgressDialogService,
  multi: true
};
