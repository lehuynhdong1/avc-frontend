import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { CarState, LoadApprovedCars } from '@shared/features/car/data-access';
import { RxState } from '@rx-angular/state';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CarListReadDto } from '@shared/api';
import { Empty } from '@shared/util';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class ListingPage implements ViewWillEnter {
  readonly searchControl = new FormControl('');

  /* Attribute Streams */
  private readonly approvedCars$ = this.store.select(CarState.approvedCars);
  readonly connectingCars$ = this.approvedCars$.pipe(
    map((cars) => cars?.result?.filter((car) => car.isConnecting))
  );
  readonly notConnectingCars$ = this.approvedCars$.pipe(
    map((cars) => cars?.result?.filter((car) => !car.isConnecting))
  );
  constructor(private store: Store, private state: RxState<Empty>) {
    this.declareSideEffects();
  }

  ionViewWillEnter(): void {
    const { value } = this.searchControl;
    this.store.dispatch(new LoadApprovedCars({ searchValue: value ?? '' }));
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
      this.store.dispatch(new LoadApprovedCars({ searchValue, isAvailable: true }))
    );
  }

  trackById(_: number, item: CarListReadDto) {
    return item.id;
  }
}
