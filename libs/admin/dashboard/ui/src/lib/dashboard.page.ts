import { Store } from '@ngxs/store';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarState, LoadApprovedCars } from '@shared/features/car/data-access';
import { hasValue } from '@shared/util';
import { StaffState, LoadStaffs } from '@shared/features/staff/data-access';
import { ManagerState, LoadManagers } from '@shared/features/manager/data-access';
import { map } from 'rxjs/operators';
import { AccountReadDtoPagingResponseDto } from '@shared/api';

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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPage {
  approvedCars$ = this.store.select(CarState.approvedCars).pipe(
    hasValue(),
    map(({ result }) => result?.map(({ createdAt, name }) => ({ createdAt, name })))
  );
  managers$ = this.store.select(ManagerState.managers).pipe(hasValue(), map(toIdAndName));
  staffs$ = this.store.select(StaffState.staffs).pipe(hasValue(), map(toIdAndName));

  readonly value = [
    [1, 50],
    [2, 75],
    [3, 50],
    [4, 150],
    [5, 155],
    [6, 190],
    [7, 90]
  ];

  constructor(private store: Store) {
    this.store.dispatch([new LoadApprovedCars(), new LoadManagers({}), new LoadStaffs({})]);
  }
}
