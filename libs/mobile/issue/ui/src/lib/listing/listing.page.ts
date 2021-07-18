import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { IssueState, LoadIssues } from '@shared/features/issue/data-access';
import { RxState } from '@rx-angular/state';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, withLatestFrom } from 'rxjs/operators';
import { Empty, hasValue } from '@shared/util';
import { IssueReadDto } from '@shared/api';
import { SignalRState } from '@shared/features/signalr/data-access';

@Component({
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class ListingPage {
  readonly searchControl = new FormControl('');
  /* Attribute Streams */
  readonly issues$ = this.store.select(IssueState.issues);

  private searchValueChanged$ = this.searchControl.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged()
  );

  constructor(private store: Store, private state: RxState<Empty>) {
    this.store.dispatch(new LoadIssues({}));
    this.declareSideEffects();
  }

  private declareSideEffects() {
    this.state.hold(this.searchValueChanged$, (searchValue) =>
      this.store.dispatch(new LoadIssues({ searchValue }))
    );
    this.signalrEffect();
  }

  private signalrEffect() {
    // Merge all to archive only 1 subscription for notification
    const whenCarNotifyMustFetchNewData$ = this.store
      .select(SignalRState.get('WhenIssueCreated'))
      .pipe(hasValue(), withLatestFrom(this.searchValueChanged$));
    this.state.hold(whenCarNotifyMustFetchNewData$, ([, searchValue]) =>
      this.store.dispatch([new LoadIssues({ searchValue, limit: 10 })])
    );
  }

  trackById(_: number, item: IssueReadDto) {
    return item.id;
  }
}
