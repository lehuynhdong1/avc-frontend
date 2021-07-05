import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { ConfirmDialogService, ConfirmDialogComponentParams } from '@shared/ui/confirm-dialog';
import { TuiAppearance } from '@taiga-ui/core';
import { map } from 'rxjs/operators';

const confirmDialogParams: ConfirmDialogComponentParams = {
  content: `You're on editting. Would you like to discard all changes?`,
  buttons: [
    {
      id: 1,
      label: 'Discard Changes'
    },
    {
      id: 2,
      label: 'Keep me here',
      uiOptions: {
        appearance: TuiAppearance.Outline
      }
    }
  ]
};

export interface CanShowUnsavedDialog {
  willShowUnsavedDialog: boolean;
}

@Injectable()
export class UnsavedChangesGuard<T extends CanShowUnsavedDialog> implements CanDeactivate<T> {
  constructor(private confirmDialogService: ConfirmDialogService) {}

  canDeactivate(component: T): Observable<boolean> | Promise<boolean> | boolean {
    if (!component.willShowUnsavedDialog) return true;
    return this.confirmDialogService
      .open('Unsaved Changes', confirmDialogParams)
      .pipe(map((response) => response === 1));
  }
}
