import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { ManagerState, LoadManagers } from '@shared/features/manager/data-access';
import { Subject, combineLatest } from 'rxjs';
import { AccountManagerDetailReadDto } from '@shared/api';
import { RxState } from '@rx-angular/state';
import { ListingPageState } from './listing-page.state';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map, startWith, withLatestFrom } from 'rxjs/operators';
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
  readonly DYNAMIC_COLUMNS: DynamicTableColumns<AccountManagerDetailReadDto> = [
    { key: 'firstName', title: 'Full Name', type: 'string', cellTemplate: '#firstName #lastName' },
    { key: 'email', title: 'Email', type: 'string' },
    { key: 'phone', title: 'Phone', type: 'string', cellTemplate: '0#phone' },
    {
      key: 'isAvailable',
      title: 'Activation Status',
      type: 'boolean',
      trueMessage: 'Active',
      falseMessage: 'Inactive'
    }
  ] as const;

  readonly searchControl = new FormControl('');

  /* Attribute Streams */
  readonly managers$ = this.store.select(ManagerState.managers);
  readonly selectedManagerId$ = this.state.select('selectedManagerId');

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
    private sidebar: SidebarService,
    private state: RxState<ListingPageState>
  ) {
    this.declareSideEffects();
  }

  private declareSideEffects() {
    const lastRouteChild = this.activatedRoute.children[this.activatedRoute.children.length - 1];
    if (lastRouteChild) {
      const idFromRoute$ = lastRouteChild.params.pipe(map((params) => parseInt(params.id)));
      this.state.connect('selectedManagerId', idFromRoute$);
    }
    this.state.connect('selectedManagerId', this.selectRow$);
    this.state.hold(
      combineLatest([this.changeSearchValue$, this.changeIsAvailable$]),
      ([searchValue, isAvailable]) => {
        this.store.dispatch(new LoadManagers({ searchValue, isAvailable, limit: 10 }));
      }
    );

    this.state.hold(this.selectRow$, (id) => {
      this.sidebar.collapse();
      this.router.navigate([id], { relativeTo: this.activatedRoute });
    });

    this.state.hold(
      this.loadPage$.pipe(withLatestFrom(this.changeSearchValue$, this.changeIsAvailable$)),
      ([index, searchValue, isAvailable]) =>
        this.store.dispatch(
          new LoadManagers({ searchValue, isAvailable, limit: 10, page: index + 1 })
        )
    );
  }
}
