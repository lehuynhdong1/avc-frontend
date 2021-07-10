import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { IssueState, LoadIssues } from '@shared/features/issue/data-access';
import { RxState } from '@rx-angular/state';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Empty } from '@shared/util';
import { IssueReadDto } from '@shared/api';

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

  constructor(private store: Store, private state: RxState<Empty>) {
    this.store.dispatch(new LoadIssues({}));
    this.declareSideEffects();
  }

  private declareSideEffects() {
    const searchValueChanged$ = this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    );

    this.state.hold(searchValueChanged$, (searchValue) =>
      this.store.dispatch(new LoadIssues({ searchValue }))
    );
  }

  trackById(_: number, item: IssueReadDto) {
    return item.id;
  }
}
