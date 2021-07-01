import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { IssueState, LoadIssues } from '@shared/features/issue/data-access';
import { Subject } from 'rxjs';
import { IssueReadDto } from '@shared/api';
import { RxState } from '@rx-angular/state';
import { ListingPageState } from './listing-page.state';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { tuiPure } from '@taiga-ui/cdk';
import { Id, DynamicTableColumns } from '@shared/ui/dynamic-table';

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
  readonly selectedIssueId$ = this.state.select('selectedIssueId');

  /* Action Streams */
  readonly selectRow$ = new Subject<Id>();

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private state: RxState<ListingPageState>
  ) {
    this.store.dispatch(new LoadIssues({ limit: 10 }));
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
      this.state.connect('selectedIssueId', idFromRoute$);
    }
    const searchValueChanged$ = this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    );

    this.state.hold(searchValueChanged$, (searchValue) =>
      this.store.dispatch(new LoadIssues({ searchValue, limit: 10 }))
    );
    this.state.hold(this.selectRow$, (id) => {
      this.router.navigate([id], { relativeTo: this.activatedRoute });
    });
  }
}
