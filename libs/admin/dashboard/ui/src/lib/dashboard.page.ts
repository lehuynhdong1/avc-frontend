import { Store } from '@ngxs/store';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarState, LoadApprovedCars } from '@shared/features/car/data-access';
import { hasValue } from '@shared/util';
import { StaffState, LoadStaffs } from '@shared/features/staff/data-access';
import { ManagerState, LoadManagers } from '@shared/features/manager/data-access';
import { map } from 'rxjs/operators';
import { AccountReadDtoPagingResponseDto } from '@shared/api';
import { TuiDay, TuiDayLike, TuiDayRange } from '@taiga-ui/cdk';
import { DatePipe } from '@angular/common';
import { FormControl } from '@angular/forms';

function toIdAndName({ result }: AccountReadDtoPagingResponseDto) {
  if (!result) return [];
  return result.map(({ id, firstName, lastName }) => ({
    id,
    name: `${firstName} ${lastName}`
  }));
}
@Component({
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DatePipe]
})
export class DashboardPage {
  approvedCars$ = this.store.select(CarState.approvedCars).pipe(
    hasValue(),
    map(({ result }) => result?.map(({ createdAt, name }) => ({ createdAt, name })))
  );
  managers$ = this.store.select(ManagerState.managers).pipe(hasValue(), map(toIdAndName));
  staffs$ = this.store.select(StaffState.staffs).pipe(hasValue(), map(toIdAndName));

  data$ = this.store.select(CarState.approvedCars).pipe(
    hasValue(),
    map(({ result }) =>
      result?.map(({ createdAt }) => ({
        name: this.datePipe.transform(createdAt, 'dd-MM'),
        series: result?.map(({ name }) => ({ name, value: 2132 }))
      }))
    )
  );
  readonly value = [
    [1, 50] as const,
    [2, 75] as const,
    [3, 50] as const,
    [4, 150] as const,
    [5, 155] as const,
    [6, 190] as const,
    [7, 90] as const
  ];

  // options

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  range = new TuiDayRange(TuiDay.currentLocal(), TuiDay.currentLocal().append({ year: 1 }));
  dateRangeControl = new FormControl(this.range);

  readonly maxLength: TuiDayLike = { month: 12 };

  constructor(private store: Store, private datePipe: DatePipe) {
    this.store.dispatch([new LoadApprovedCars(), new LoadManagers({}), new LoadStaffs({})]);
  }

  onSelect(data: string): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
}
