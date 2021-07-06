import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { IssueState, LoadIssueById } from '@shared/features/issue/data-access';
import { RxState } from '@rx-angular/state';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { hasValue, Empty } from '@shared/util';
import { BottomBarVisibilityService } from '@mobile/core/ui';

@Component({
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class DetailPage implements OnDestroy {
  readonly selectedIssue$ = this.store.select(IssueState.selectedIssue).pipe(hasValue());
  private readonly id$ = this.activatedRoute.params.pipe(map(({ id }) => parseInt(id)));

  /* Actions */
  readonly clickActivate$ = new Subject<void>();

  /* Side effects */

  constructor(
    private store: Store,
    private activatedRoute: ActivatedRoute,
    private state: RxState<Empty>,
    private bottomBar: BottomBarVisibilityService
  ) {
    bottomBar.hide();
    this.state.hold(this.id$, (id) => {
      this.store.dispatch(new LoadIssueById({ id }));
    });
  }

  ngOnDestroy() {
    this.bottomBar.show();
  }
}
