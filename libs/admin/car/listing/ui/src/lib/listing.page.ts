import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { CarState, LoadApprovedCars, LoadUnapprovedCars } from '@shared/features/car/data-access';
import { Subject } from 'rxjs';
import { CarListReadDto } from '@shared/api';
import { RxState } from '@rx-angular/state';
import { ListingPageState } from './listing-page.state';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { hasValue } from '@shared/util';
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
  page = 0;
  size = 10;

  /* Attribute Streams */
  readonly approvedCars$ = this.store.select(CarState.approvedCars);
  readonly unapprovedCarsCount$ = this.store.select(CarState.unapprovedCars).pipe(
    hasValue(),
    map((cars) => cars.count)
  );
  readonly selectedCarId$ = this.state.select('selectedCarId');

  /* Action Streams */
  readonly selectRow$ = new Subject<Id>();
  readonly changeSearchValue$ = this.searchControl.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged()
  );

  constructor(
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private state: RxState<ListingPageState>
  ) {
    this.store.dispatch([new LoadApprovedCars({ limit: 10 }), new LoadUnapprovedCars()]);
    this.declareSideEffects();
  }

  private declareSideEffects() {
    const lastRouteChild = this.activatedRoute.children[this.activatedRoute.children.length - 1];
    if (lastRouteChild) {
      const idFromRoute$ = lastRouteChild.params.pipe(map((params) => parseInt(params.id)));
      this.state.connect('selectedCarId', idFromRoute$);
    }
    this.state.connect('selectedCarId', this.selectRow$);
    this.state.hold(this.changeSearchValue$, (value) => {
      this.store.dispatch(new LoadApprovedCars({ searchValue: value, limit: 10 }));
    });
    this.state.hold(this.selectRow$, (id) => {
      this.router.navigate([id], { relativeTo: this.activatedRoute });
    });
  }
}
