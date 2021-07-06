import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { CarState, LoadApprovedCars } from '@shared/features/car/data-access';
import { RxState } from '@rx-angular/state';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CarListReadDto } from '@shared/api';
import { Empty } from '@shared/util';

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
  constructor(private store: Store, private state: RxState<Empty>) {
    this.store.dispatch(new LoadApprovedCars());
    this.declareSideEffects();
  }

  private declareSideEffects() {
    this.whenFilterChangedEffects();
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
