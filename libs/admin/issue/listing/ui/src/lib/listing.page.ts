import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { IssueState, LoadIssues } from '@shared/features/issue/data-access';
import { Subject } from 'rxjs';
import { IssueReadDto } from '@shared/api';
import { RxState } from '@rx-angular/state';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Id, DynamicTableColumns } from '@shared/ui/dynamic-table';
import { SidebarService } from '@admin/core/ui';
import { Empty } from '@shared/util';

@Component({
  selector: 'adca-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class ListingPage {
  DYNAMIC_COLUMNS: DynamicTableColumns<IssueReadDto> = [
    { key: 'type', title: 'Type', type: 'string' },
    { key: 'createdAt', title: 'Created at', type: 'date' },
    { key: 'description', title: 'Description', type: 'string' },
    { key: 'location', title: 'Location', type: 'string' }
  ];
  readonly searchControl = new FormControl('');
  page = 0;
  size = 10;

  /* Attribute Streams */
  readonly issues$ = this.store.select(IssueState.issues);

  /* Action Streams */
  readonly selectRow$ = new Subject<Id>();

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private sidebar: SidebarService,
    private router: Router,
    private state: RxState<Empty>
  ) {
    this.store.dispatch(new LoadIssues({ limit: 10 }));
    this.declareSideEffects();
  }

  private declareSideEffects() {
    const searchValueChanged$ = this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    );

    this.state.hold(searchValueChanged$, (searchValue) =>
      this.store.dispatch(new LoadIssues({ searchValue, limit: 10 }))
    );
    this.state.hold(this.selectRow$, (id) => {
      this.sidebar.collapse();
      this.router.navigate([id], { relativeTo: this.activatedRoute });
    });
  }
}
