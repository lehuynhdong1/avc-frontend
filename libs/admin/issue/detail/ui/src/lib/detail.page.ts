import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngxs/store';
import { IssueState, LoadIssueById } from '@shared/features/issue/data-access';
import { RxState } from '@rx-angular/state';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { hasValue } from '@shared/util';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'adca-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class DetailPage {
  readonly selectedIssue$ = this.store.select(IssueState.selectedIssue).pipe(hasValue());
  private readonly id$ = this.activatedRoute.params.pipe(map(({ id }) => parseInt(id)));

  /* Actions */
  readonly clickActivate$ = new Subject<void>();

  /* Side effects */

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private state: RxState<Record<string, never>>,
    title: Title
  ) {
    this.state.hold(this.id$, (id) => {
      this.store.dispatch(new LoadIssueById({ id }));
    });
    this.state.hold(this.selectedIssue$, (issue) => title.setTitle(issue.type + ' | AVC'));
  }
}
