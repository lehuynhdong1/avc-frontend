import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { CarState, LoadApprovedCars, LoadUnapprovedCars } from '@shared/features/car/data-access';
import { combineLatest, Subject } from 'rxjs';
import { CarListReadDto } from '@shared/api';
import { RxState } from '@rx-angular/state';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  filter,
  shareReplay
} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { hasValue, Empty } from '@shared/util';
import { DynamicTableColumns, Id } from '@shared/ui/dynamic-table';
import { LoginState } from '@shared/auth/login/data-access';
import { withLatestFrom } from 'rxjs/operators';
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
  readonly isAdmin$ = this.store.select(LoginState.account).pipe(
    map((my) => my?.role === 'Admin'),
    shareReplay({ refCount: true, bufferSize: 1 })
  );
  /* Action Streams */
  readonly selectRow$ = new Subject<Id>();
  readonly changeIsAvailable$ = new Subject<boolean | undefined>();
  readonly loadPage$ = new Subject<number>();

  /* Side effects */
  readonly changeSearchValue$ = this.searchControl.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged(),
    startWith('')
  );

  constructor(
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private state: RxState<Empty>
  ) {
    state.hold(this.isAdmin$.pipe(filter((isAdmin) => isAdmin)), () =>
      this.store.dispatch(new LoadUnapprovedCars())
    );
    this.whenFilterChangedEffects();
    this.whenLoadPageEffects();
    this.declareSideEffects();
  }

  private declareSideEffects() {
    this.state.hold(this.selectRow$, (id) =>
      this.router.navigate([id], { relativeTo: this.activatedRoute })
    );
  }

  private whenFilterChangedEffects() {
    this.state.hold(
      combineLatest([this.changeSearchValue$, this.changeIsAvailable$]),
      ([searchValue, isAvailable]) => {
        this.store.dispatch(new LoadApprovedCars({ searchValue, isAvailable, limit: 10 }));
      }
    );
  }
  private whenLoadPageEffects() {
    this.state.hold(
      this.loadPage$.pipe(withLatestFrom(this.changeSearchValue$, this.changeIsAvailable$)),
      ([index, searchValue, isAvailable]) =>
        this.store.dispatch(
          new LoadApprovedCars({ searchValue, isAvailable, limit: 10, page: index + 1 })
        )
    );
  }
}
