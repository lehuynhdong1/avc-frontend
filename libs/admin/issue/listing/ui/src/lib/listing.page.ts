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
import { TuiStatus } from '@taiga-ui/kit';

@Component({
  selector: 'adca-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class ListingPage {
  TUI_STATUS = {
    ERROR: TuiStatus.Error,
    SUCCESS: TuiStatus.Success,
    PRIMARY: TuiStatus.Primary
  };

  /* Configurations */
  readonly COLUMNS: ReadonlyArray<keyof IssueReadDto | 'index'> = [
    'index',
    'type',
    'createdAt',
    'image',
    'description',
    'location',
    'isAvailable'
  ] as const;
  readonly searchControl = new FormControl('');
  page = 0;
  size = 10;

  /* Attribute Streams */
  readonly issues$ = this.store.select(IssueState.issues);
  readonly isOpened$ = this.state.select('isOpened');
  readonly selectedIssueId$ = this.state.select('selectedIssueId');

  /* Action Streams */
  readonly selectRow$ = new Subject<number>();
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
    this.state.connect('selectedIssueId', this.selectRow$);
    this.state.connect('isOpened', this.openAside$);
    this.state.hold(this.changeSearchValue$, (value) => {
      this.store.dispatch(new LoadIssues({ searchValue: value, limit: 10 }));
    });
    this.state.hold(this.closeDetail$, () => {
      this.state.set({ selectedIssueId: 0 });
      this.router.navigateByUrl('/issue');
    });
  }
}
