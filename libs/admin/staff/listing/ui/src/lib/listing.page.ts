import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { ListingState, LoadStaffs } from '@shared/features/staff/data-access';
import { BehaviorSubject } from 'rxjs';
import { AccountStaffReadDto } from '@shared/api';
import { RxState } from '@rx-angular/state';
import { ListingPageState, INITIAL_STATE, CUSTOM_OPERATORS } from './listing-page.state';

@Component({
  selector: 'adca-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class ListingPage {
  /* Configurations */
  readonly COLUMNS: ReadonlyArray<keyof AccountStaffReadDto | 'index' | 'name'> = [
    'index',
    'name',
    'email',
    'phone',
    'managedByEmail',
    'isAvailable'
  ] as const;

  /* Attribute Streams */
  readonly staffs$ = this.store.select(ListingState.staffs);
  readonly isOpened$ = this.state.select('isOpened');
  readonly selectedStaffId$ = this.state.select('selectedStaffId');

  /* Action Streams */
  readonly selectRow$ = new BehaviorSubject(0);
  readonly openAside$ = new BehaviorSubject(false);

  constructor(private store: Store, private state: RxState<ListingPageState>) {
    this.store.dispatch(new LoadStaffs({ limit: 10 }));
    this.state.set(INITIAL_STATE);
    this.declareSideEffects();
  }

  private declareSideEffects() {
    this.state.hold(this.selectRow$.pipe(CUSTOM_OPERATORS.skipInitial()), (id) => {
      this.state.set({ selectedStaffId: id });
    });
    this.state.hold(this.openAside$, (isOpened) => {
      this.state.set({ isOpened });
    });
  }
}
