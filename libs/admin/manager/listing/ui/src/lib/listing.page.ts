import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { ManagerState, LoadManagers } from '@shared/features/manager/data-access';
import { Subject } from 'rxjs';
import { AccountManagerReadDto } from '@shared/api';
import { RxState } from '@rx-angular/state';
import { ListingPageState } from './listing-page.state';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { tuiPure } from '@taiga-ui/cdk';
import { DynamicTableColumns, Id } from '@shared/ui/dynamic-table';

@Component({
  selector: 'adca-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class ListingPage {
  DYNAMIC_COLUMNS: DynamicTableColumns<AccountManagerReadDto> = [
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
  ];

  readonly searchControl = new FormControl('');
  /* Attribute Streams */
  readonly managers$ = this.store.select(ManagerState.managers);
  readonly isOpened$ = this.state.select('isOpened');
  readonly selectedManagerId$ = this.state.select('selectedManagerId');

  /* Action Streams */
  readonly selectRow$ = new Subject<Id>();
  readonly openAside$ = new Subject<boolean>();
  readonly closeDetail$ = new Subject<void>();
  readonly changeSearchValue$ = this.searchControl.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged()
  );

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private state: RxState<ListingPageState>
  ) {
    this.store.dispatch(new LoadManagers({ limit: 10 }));
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
    this.state.connect('isOpened', this.openAside$);

    this.state.hold(this.changeSearchValue$, (value) => {
      this.store.dispatch(new LoadManagers({ searchValue: value, limit: 10 }));
    });
    this.state.hold(this.closeDetail$, () => {
      this.state.set({ selectedManagerId: 0 });
      this.router.navigateByUrl('/manager');
    });
    this.state.hold(this.selectRow$, (id) => {
      this.router.navigate([id], { relativeTo: this.activatedRoute });
    });
  }
}
