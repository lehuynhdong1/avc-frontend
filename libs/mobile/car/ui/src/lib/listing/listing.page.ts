import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { CarState, LoadApprovedCars } from '@shared/features/car/data-access';
import { RxState } from '@rx-angular/state';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { CarListReadDto } from '@shared/api';
import { Empty, hasValue } from '@shared/util';
import { ViewWillEnter } from '@ionic/angular';
import { merge } from 'rxjs';
import { SignalRState } from '@shared/features/signalr/data-access';

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
    this.signalrEffect();
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

  private signalrEffect() {
    type WhenCarNotify =
      | 'WhenCarConnected'
      | 'WhenCarDisconnected'
      | 'WhenIssueCreated'
      | 'WhenManagerChangeAssignedCar'
      | 'WhenCarDeactivated';

    const carNotifys = [
      'WhenCarConnected',
      'WhenCarDisconnected',
      'WhenIssueCreated',
      'WhenManagerChangeAssignedCar',
      'WhenCarDeactivated'
    ];

    // Merge all to archive only 1 subscription for notification
    const whenCarNotifyMustFetchNewData$ = merge(
      ...carNotifys.map((key) => {
        const typedKey = key as WhenCarNotify;
        return this.store.select(SignalRState.get(typedKey)).pipe(
          hasValue(),
          map(() => this.searchControl.value)
        );
      })
    );
    this.state.hold(whenCarNotifyMustFetchNewData$, (searchValue) =>
      this.store.dispatch(new LoadApprovedCars({ searchValue }))
    );
  }

  trackById(_: number, item: CarListReadDto) {
    return item.id;
  }
}
