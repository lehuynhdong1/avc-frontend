import { Observable } from 'rxjs';
import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';
import { TuiDialog } from '@taiga-ui/cdk';

@Component({
  selector: 'adc-frontend-progress-dialog',
  templateUrl: './progress-dialog.component.html',
  styleUrls: ['./progress-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressDialogComponent {
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    readonly context: TuiDialog<{ data: ProgressDialogComponentParams }, number>
  ) {}
}

export interface ProgressDialogComponentParams {
  progress$: Observable<{ loaded: number; total: number }>;
}
