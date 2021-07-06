import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { TuiDialog } from '@taiga-ui/cdk';
import { TuiAppearance, TuiButtonShape, TuiSizeXL, TuiSizeXS } from '@taiga-ui/core';
import { PolymorpheusContent, POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

export interface ConfirmDialogComponentParams {
  content: string;
  buttons?: ConfirmButton[];
}
export interface ConfirmButton {
  id: number;
  label: string;
  uiOptions?: {
    shape?: TuiButtonShape;
    size?: TuiSizeXS | TuiSizeXL;
    appearance?: TuiAppearance;
    disabled?: boolean;
    icon?: PolymorpheusContent;
    iconRight?: PolymorpheusContent;
    showLoader?: boolean;
  };
}

@Component({
  selector: 'adc-frontend-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent {
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    readonly context: TuiDialog<{ data: ConfirmDialogComponentParams }, number>
  ) {}

  complete(response: number) {
    this.context.completeWith(response);
  }
}
