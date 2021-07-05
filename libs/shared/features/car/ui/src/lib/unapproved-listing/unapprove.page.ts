import { Component, ChangeDetectionStrategy } from '@angular/core';
import { DynamicTableColumns, Id } from '@shared/ui/dynamic-table';
import { CarListReadDto } from '@shared/api';
import { FormControl } from '@angular/forms';
import { hasValue, Empty } from '@shared/util';
import { Store } from '@ngxs/store';
import { CarState, LoadUnapprovedCars } from '@shared/features/car/data-access';
import { Subject } from 'rxjs';
import { RxState } from '@rx-angular/state';
import { Router, ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged, withLatestFrom } from 'rxjs/operators';

@Component({
  templateUrl: './unapprove.page.html',
  styleUrls: ['./unapprove.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class UnapprovePage {
  readonly searchControl = new FormControl('');
  DYNAMIC_COLUMNS: DynamicTableColumns<CarListReadDto> = [
    { key: 'deviceId', title: 'Device ID', type: 'string' }
  ];
  readonly unapprovedCars$ = this.store.select(CarState.unapprovedCars).pipe(hasValue());
  readonly selectRow$ = new Subject<Id>();

  constructor(
    private store: Store,
    router: Router,
    activatedRoute: ActivatedRoute,
    state: RxState<Empty>
  ) {
    state.hold(this.selectRow$.pipe(withLatestFrom(this.unapprovedCars$)), ([id, cars]) => {
      const selectedCar = cars?.result?.find((car) => car.id === id);
      router.navigate(['..', 'approve'], {
        relativeTo: activatedRoute,
        queryParams: { id, deviceId: selectedCar?.deviceId }
      });
    });
    const changeSearchValue$ = this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    );
    state.hold(changeSearchValue$, (searchValue) =>
      store.dispatch(new LoadUnapprovedCars({ searchValue }))
    );
  }
}
