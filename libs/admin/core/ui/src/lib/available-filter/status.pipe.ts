import { Pipe, PipeTransform } from '@angular/core';
import { ActivationStatuses } from '@shared/util';
import { TuiStatus } from '@taiga-ui/kit';

@Pipe({ name: 'status' })
export class StatusPipe implements PipeTransform {
  transform(value: ActivationStatuses): TuiStatus {
    const statusMap = {
      All: TuiStatus.Primary,
      Active: TuiStatus.Success,
      Inactive: TuiStatus.Error
    };
    return statusMap[value];
  }
}
