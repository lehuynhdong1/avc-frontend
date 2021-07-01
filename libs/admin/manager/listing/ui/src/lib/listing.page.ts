import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { ManagerState, LoadManagers } from '@shared/features/manager/data-access';
import { Subject, combineLatest } from 'rxjs';
import { AccountManagerReadDto } from '@shared/api';
import { RxState } from '@rx-angular/state';
import { ListingPageState } from './listing-page.state';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { tuiPure } from '@taiga-ui/cdk';
import { DynamicTableColumns, Id } from '@shared/ui/dynamic-table';
import { ActivationStatus, ActivationStatuses } from '@admin/core/util';
import { TuiStatus } from '@taiga-ui/kit';
@Component({
  selector: 'adca-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class ListingPage {
  readonly DYNAMIC_COLUMNS: DynamicTableColumns<AccountManagerReadDto> = [
    { key: 'firstName', title: 'Full Name', type: 'string', cellTemplate: '#firstName #lastName' },
    { key: 'email', title: 'Email', type: 'string' },
    { key: 'phone', title: 'Phone', type: 'string' },
    {
      key: 'isAvailable',
      title: 'Activation Status',
      type: 'boolean',
      trueMessage: 'Active',
      falseMessage: 'Inactive'
    }
  ] as const;
  readonly IS_AVAILABLE_VALUES: ReadonlyArray<ActivationStatuses> = ['All', 'Active', 'Inactive'];
  readonly TUI_STATUS = {
    ERROR: TuiStatus.Error,
    SUCCESS: TuiStatus.Success,
    PRIMARY: TuiStatus.Primary
  };

  readonly searchControl = new FormControl('');
  readonly isAvailableControl = new FormControl('All');

  /* Attribute Streams */
  readonly managers$ = this.store.select(ManagerState.managers);
  readonly selectedManagerId$ = this.state.select('selectedManagerId');

  /* Action Streams */
  readonly selectRow$ = new Subject<Id>();

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private state: RxState<ListingPageState>
  ) {
    this.declareSideEffects();
  }

  @tuiPure
  calcTotalPageCount(count: number | undefined) {
    if (!count) return 1;
    return Math.round(count / 10) + 1;
  }

  private declareSideEffects() {
    const lastRouteChild = this.activatedRoute.children[this.activatedRoute.children.length - 1];
    if (lastRouteChild) {
      const idFromRoute$ = lastRouteChild.params.pipe(map((params) => parseInt(params.id)));
      this.state.connect('selectedManagerId', idFromRoute$);
    }
    this.state.connect('selectedManagerId', this.selectRow$);

    const searchValueChanged$ = this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      startWith('')
    );
    const isAvailableChanged$ = this.isAvailableControl.valueChanges.pipe(
      debounceTime(200),
      startWith('All')
    );
    this.state.hold(
      combineLatest([searchValueChanged$, isAvailableChanged$]),
      ([searchValue, isAvailable]) => {
        const isAvailableTrueValue = ActivationStatus[isAvailable as ActivationStatuses];
        this.store.dispatch(
          new LoadManagers({ searchValue, isAvailable: isAvailableTrueValue, limit: 10 })
        );
      }
    );

    this.state.hold(this.selectRow$, (id) =>
      this.router.navigate([id], { relativeTo: this.activatedRoute })
    );
  }
}
