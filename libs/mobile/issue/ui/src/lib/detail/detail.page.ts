import { Component, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { Actions, ofActionSuccessful, Store } from '@ngxs/store';
import { IssueState, LoadIssueById } from '@shared/features/issue/data-access';
import { RxState } from '@rx-angular/state';
import { ActivatedRoute } from '@angular/router';
import { map, withLatestFrom } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { hasValue, Empty } from '@shared/util';
import { BottomBarVisibilityService } from '@mobile/core/ui';
import { CarState, LoadCarById } from '@shared/features/car/data-access';

@Component({
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class DetailPage implements OnDestroy {
  readonly selectedIssue$ = this.store.select(IssueState.selectedIssue).pipe(hasValue());
  readonly selectedCar$ = this.store.select(CarState.selectedCar).pipe(hasValue());
  private readonly id$ = this.activatedRoute.params.pipe(map(({ id }) => parseInt(id)));

  /* Actions */
  readonly clickActivate$ = new Subject<void>();

  /* Side effects */

  constructor(
    private store: Store,
    private actions: Actions,
    private activatedRoute: ActivatedRoute,
    private state: RxState<Empty>,
    private bottomBar: BottomBarVisibilityService
  ) {
    bottomBar.hide();
    this.state.hold(this.id$, (id) => {
      this.store.dispatch(new LoadIssueById({ id }));
    });

    const whenLoadIssueSuccess$ = this.actions
      .pipe<LoadIssueById>(ofActionSuccessful(LoadIssueById))
      .pipe(withLatestFrom(this.selectedIssue$));
    this.state.hold(whenLoadIssueSuccess$, ([, issue]) =>
      this.store.dispatch(new LoadCarById({ id: issue.carId || 0 }))
    );
  }

  ngOnDestroy() {
    this.bottomBar.show();
  }
}
