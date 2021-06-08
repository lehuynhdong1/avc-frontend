import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { TuiDialog } from '@taiga-ui/cdk';
import { POLYMORPHEUS_CONTEXT } from '@tinkoff/ng-polymorpheus';

export interface ImageDialogComponentParams {
  dataUrl: string;
  name: string;
}

@Component({
  selector: 'adca-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageDialogComponent {
  constructor(
    @Inject(POLYMORPHEUS_CONTEXT)
    readonly context: TuiDialog<{ data: ImageDialogComponentParams }, number>
  ) {}

  complete(response: number) {
    this.context.completeWith(response);
  }
}
