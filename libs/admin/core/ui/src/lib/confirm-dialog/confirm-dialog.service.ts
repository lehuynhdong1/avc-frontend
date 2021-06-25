import { Injectable, Injector } from '@angular/core';
import { ConfirmDialogComponentParams, ConfirmDialogComponent } from './confirm-dialog.component';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { TuiDialogService } from '@taiga-ui/core';

@Injectable({ providedIn: 'root' })
export class ConfirmDialogService {
  constructor(private readonly dialogService: TuiDialogService, private injector: Injector) {}

  open(label: string, confirmDialogParams: ConfirmDialogComponentParams) {
    return this.dialogService.open<number>(
      new PolymorpheusComponent(ConfirmDialogComponent, this.injector),
      { label, data: confirmDialogParams }
    );
  }
}
