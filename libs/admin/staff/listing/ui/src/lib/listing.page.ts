import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { StaffState, LoadStaffs } from '@shared/features/staff/data-access';
import { Subject, combineLatest } from 'rxjs';
import { AccountStaffDetailReadDto } from '@shared/api';
import { RxState } from '@rx-angular/state';
import { ListingPageState } from './listing-page.state';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicTableColumns, Id } from '@shared/ui/dynamic-table';
import { SidebarService } from '@admin/core/ui';
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
    { key: 'phone', title: 'Phone', type: 'string' },
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
  readonly selectedStaffId$ = this.state.select('selectedStaffId');

  /* Action Streams */
  readonly selectRow$ = new Subject<Id>();
  readonly changeIsAvailable$ = new Subject<boolean | undefined>();

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sidebar: SidebarService,
    private state: RxState<ListingPageState>
  ) {
    this.declareSideEffects();
  }

  private declareSideEffects() {
    const lastRouteChild = this.activatedRoute.children[this.activatedRoute.children.length - 1];
    if (lastRouteChild) {
      const idFromRoute$ = lastRouteChild.params.pipe(map((params) => parseInt(params.id)));
      this.state.connect('selectedStaffId', idFromRoute$);
    }
    this.state.connect('selectedStaffId', this.selectRow$);

    this.whenFilterChangedEffects();
    this.state.hold(this.selectRow$, (id) => {
      this.sidebar.collapse();
      this.router.navigate([id], { relativeTo: this.activatedRoute });
    });
  }

  private whenFilterChangedEffects() {
    const changeSearchValue$ = this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      startWith('')
    );
    this.state.hold(
      combineLatest([changeSearchValue$, this.changeIsAvailable$]),
      ([searchValue, isAvailable]) => {
        this.store.dispatch(new LoadStaffs({ searchValue, isAvailable, limit: 10 }));
      }
    );
  }
}
