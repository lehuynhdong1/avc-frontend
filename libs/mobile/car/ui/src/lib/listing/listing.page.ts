import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { CarState, LoadApprovedCars } from '@shared/features/car/data-access';
import { Subject } from 'rxjs';
import { RxState } from '@rx-angular/state';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { CarListReadDto } from '@shared/api';

@Component({
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class ListingPage {
  readonly searchControl = new FormControl('');

  /* Attribute Streams */
  private readonly approvedCars$ = this.store.select(CarState.approvedCars);
  readonly runningCars$ = this.approvedCars$.pipe(
    map((cars) => cars?.result?.filter((car) => car.isRunning))
  );
  readonly waitingCars$ = this.approvedCars$.pipe(
    map((cars) => cars?.result?.filter((car) => !car.isRunning))
  );
  readonly isShowSearch$ = this.state.select('isShowSearch');

  readonly selectRow$ = new Subject<number>();
  readonly showSearch$ = new Subject<void>();

  constructor(
    private store: Store,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private state: RxState<{ isShowSearch: boolean }>
  ) {
    this.store.dispatch(new LoadApprovedCars());
    this.declareSideEffects();
    this.state.hold(this.showSearch$, () =>
      this.state.set('isShowSearch', (isShowSearch) => !isShowSearch)
    );
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
      distinctUntilChanged()
    );
    this.state.hold(changeSearchValue$, (searchValue) =>
      this.store.dispatch(new LoadApprovedCars({ searchValue, isAvailable: true, limit: 10 }))
    );
  }

  trackById(_: number, item: CarListReadDto) {
    return item.id;
  }
}
