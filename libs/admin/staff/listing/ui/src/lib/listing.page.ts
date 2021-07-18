import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { StaffState, LoadStaffs } from '@shared/features/staff/data-access';
import { Subject, combineLatest, merge } from 'rxjs';
import { AccountStaffDetailReadDto } from '@shared/api';
import { RxState } from '@rx-angular/state';
import { FormControl } from '@angular/forms';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  map,
  shareReplay,
  withLatestFrom
} from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicTableColumns, Id } from '@shared/ui/dynamic-table';
import { Empty, hasValue } from '@shared/util';
import { LoginState } from '@shared/auth/login/data-access';
import { SignalRState } from '@shared/features/signalr/data-access';
@Component({
  selector: 'adca-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class ListingPage {
  DYNAMIC_COLUMNS: DynamicTableColumns<AccountStaffDetailReadDto> = [
    { key: 'firstName', title: 'Full Name', type: 'string', cellTemplate: '#firstName #lastName' },
    { key: 'email', title: 'Email', type: 'string' },
    { key: 'phone', title: 'Phone', type: 'string', cellTemplate: '0#phone' },
    {
      key: 'managedBy',
      title: 'Managed by',
      cellTemplate: '#managedBy.firstName #managedBy.lastName',
      type: 'string'
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
  readonly staffs$ = this.store.select(StaffState.staffs);
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
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private state: RxState<Empty>
  ) {
    this.whenFilterChangedEffects();
    this.whenSelectRowEffects();
    this.whenLoadPageEffects();
    this.signalrEffect();
  }

  private whenSelectRowEffects() {
    this.state.hold(this.selectRow$, (id) =>
      this.router.navigate([id], { relativeTo: this.activatedRoute })
    );
  }

  private whenFilterChangedEffects() {
    this.state.hold(
      combineLatest([this.changeSearchValue$, this.changeIsAvailable$]),
      ([searchValue, isAvailable]) => {
        this.store.dispatch(new LoadStaffs({ searchValue, isAvailable, limit: 10 }));
      }
    );
  }

  private whenLoadPageEffects() {
    this.state.hold(
      this.loadPage$.pipe(withLatestFrom(this.changeSearchValue$, this.changeIsAvailable$)),
      ([index, searchValue, isAvailable]) =>
        this.store.dispatch(
          new LoadStaffs({ searchValue, isAvailable, limit: 10, page: index + 1 })
        )
    );
  }

  private signalrEffect() {
    type WhenCarNotify = 'WhenStaffDeactivated' | 'WhenAdminChangeStaffManagedBy';

    const carNotifys = ['WhenStaffDeactivated', 'WhenAdminChangeStaffManagedBy'];

    // Merge all to archive only 1 subscription for notification
    const whenCarNotifyMustFetchNewData$ = merge(
      ...carNotifys.map((key) => {
        const typedKey = key as WhenCarNotify;
        return this.store
          .select(SignalRState.get(typedKey))
          .pipe(hasValue(), withLatestFrom(this.changeSearchValue$, this.changeIsAvailable$));
      })
    );
    this.state.hold(whenCarNotifyMustFetchNewData$, ([, searchValue, isAvailable]) =>
      this.store.dispatch([new LoadStaffs({ searchValue, isAvailable, limit: 10 })])
    );
  }
}
