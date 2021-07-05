import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { CarState, LoadApprovedCars, LoadUnapprovedCars } from '@shared/features/car/data-access';
import { combineLatest, Subject } from 'rxjs';
import { CarListReadDto } from '@shared/api';
import { RxState } from '@rx-angular/state';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { hasValue, Empty } from '@shared/util';
import { DynamicTableColumns, Id } from '@shared/ui/dynamic-table';
@Component({
  selector: 'adca-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class ListingPage {
  DYNAMIC_COLUMNS: DynamicTableColumns<CarListReadDto> = [
    { key: 'name', title: 'Name', type: 'string' },
    { key: 'deviceId', title: 'Device ID', type: 'string' },
    {
      key: 'managedBy',
      title: 'Managed by',
      type: 'string',
      cellTemplate: '#managedBy.firstName #managedBy.lastName'
    },
    {
      key: 'isConnecting',
      title: 'Connecting Status',
      type: 'boolean',
      trueMessage: 'Connected',
      falseMessage: 'Disconnected'
    },
    {
      key: 'isAvailable',
      title: 'Activation Status',
      type: 'boolean',
      trueMessage: 'Active',
      falseMessage: 'Inactive'
    }
  ];

  readonly searchControl = new FormControl('');

  /* Attribute Streams */
  readonly approvedCars$ = this.store.select(CarState.approvedCars);
  readonly unapprovedCarsCount$ = this.store.select(CarState.unapprovedCars).pipe(
    hasValue(),
    map((cars) => cars.count)
  );

  /* Action Streams */
  readonly selectRow$ = new Subject<Id>();
  readonly changeIsAvailable$ = new Subject<boolean | undefined>();

  constructor(
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private state: RxState<Empty>
  ) {
    this.store.dispatch(new LoadUnapprovedCars());
    this.declareSideEffects();
  }

  private declareSideEffects() {
    this.whenFilterChangedEffects();
    this.state.hold(this.selectRow$, (id) =>
      this.router.navigate([id], { relativeTo: this.activatedRoute })
    );
  }

  private whenFilterChangedEffects() {
    const changeSearchValue$ = this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      startWith('')
    );
    this.state.hold(
      combineLatest([changeSearchValue$, this.changeIsAvailable$]),
      ([searchValue, isAvailable]) => {
        this.store.dispatch(new LoadApprovedCars({ searchValue, isAvailable, limit: 10 }));
      }
    );
  }
}
