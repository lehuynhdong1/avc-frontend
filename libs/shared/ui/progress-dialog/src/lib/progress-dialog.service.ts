import { Injectable } from '@angular/core';
import {
  ProgressDialogComponentParams,
  ProgressDialogComponent
} from './progress-dialog.component';
import { PolymorpheusComponent } from '@tinkoff/ng-polymorpheus';
import { AbstractTuiDialogService } from '@taiga-ui/cdk';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProgressDialogService extends AbstractTuiDialogService<ProgressDialogComponentParams> {
  protected component = new PolymorpheusComponent(ProgressDialogComponent);
  protected defaultOptions: ProgressDialogComponentParams = {
    progress$: of({ loaded: 200, total: 450 })
  };
}
