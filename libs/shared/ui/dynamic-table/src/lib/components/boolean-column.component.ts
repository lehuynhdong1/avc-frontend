import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { BooleanField } from '../models';
import { TuiStatus } from '@taiga-ui/kit';

@Component({
  selector: 'adc-frontend-boolean-column',
  template: `
    <tui-badge
      size="m"
      [value]="item[column.key] ? column.trueMessage : column.falseMessage"
      [status]="item[column.key] ? TUI_STATUS.SUCCESS : TUI_STATUS.ERROR"
    ></tui-badge>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooleanColumnComponent<Dto> {
  @Input() item: Dto;
  @Input() column: BooleanField<Dto>;

  TUI_STATUS = {
    ERROR: TuiStatus.Error,
    SUCCESS: TuiStatus.Success,
    PRIMARY: TuiStatus.Primary
  };
}
