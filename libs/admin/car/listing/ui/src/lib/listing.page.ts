import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { CarState, LoadApprovedCars, LoadUnapprovedCars } from '@shared/features/car/data-access';
import { Subject } from 'rxjs';
import { CarListReadDto } from '@shared/api';
import { RxState } from '@rx-angular/state';
import { ListingPageState } from './listing-page.state';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { TuiStatus } from '@taiga-ui/kit';
import { tuiPure } from '@taiga-ui/cdk';
import { hasValue } from '@shared/util';
@Component({
  selector: 'adca-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class ListingPage {
  TUI_STATUS = {
    ERROR: TuiStatus.Error,
    SUCCESS: TuiStatus.Success,
    PRIMARY: TuiStatus.Primary
  };

  /* Configurations */
  readonly COLUMNS: ReadonlyArray<keyof CarListReadDto | 'index'> = [
    'index',
    'name',
    'deviceId',
    'managedBy',
    'assignTo',
    'isConnecting',
    'isAvailable'
  ] as const;

  readonly searchControl = new FormControl('');
  page = 0;
  size = 10;

  /* Attribute Streams */
  readonly approvedCars$ = this.store.select(CarState.approvedCars);
  readonly unapprovedCars$ = this.store.select(CarState.unapprovedCars).pipe(hasValue());
  readonly unapprovedCarsCount$ = this.unapprovedCars$.pipe(map((cars) => cars.count));
  readonly selectedCarId$ = this.state.select('selectedCarId');

  /* Action Streams */
  readonly selectRow$ = new Subject<number>();
  readonly changeSearchValue$ = this.searchControl.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged()
  );

  constructor(
    private store: Store,
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
  }

  @tuiPure
  calcTotalPageCount(count: number | undefined) {
    if (!count) return 1;
    return Math.round(count / 10) + 1;
  }
}
