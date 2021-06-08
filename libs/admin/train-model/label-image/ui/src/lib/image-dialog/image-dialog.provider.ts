import { Provider } from '@angular/core';
import { TUI_DIALOGS } from '@taiga-ui/cdk';
import { ImageDialogService } from './image-dialog.service';

export const IMAGE_DIALOG_PROVIDER: Provider = {
  provide: TUI_DIALOGS,
  useExisting: ImageDialogService,
  multi: true
};
