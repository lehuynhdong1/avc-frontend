import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, ofActionSuccessful, Actions } from '@ngxs/store';
import { IssueState, LoadIssueById } from '@shared/features/issue/data-access';
import { RxState } from '@rx-angular/state';
import { ActivatedRoute } from '@angular/router';
import { map, withLatestFrom, take } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { hasValue, Empty } from '@shared/util';
import { Title } from '@angular/platform-browser';
import { CarState, LoadCarById } from '@shared/features/car/data-access';
import { TuiDialogContext, TuiDialogService } from '@taiga-ui/core';
import { PolymorpheusContent } from '@tinkoff/ng-polymorpheus';

@Component({
  selector: 'adca-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class DetailPage {
  readonly selectedIssue$ = this.store.select(IssueState.selectedIssue).pipe(hasValue());
  readonly selectedCar$ = this.store.select(CarState.selectedCar).pipe(hasValue());
  readonly backTo$ = this.activatedRoute.queryParams.pipe(map(({ backTo }) => backTo));
  private readonly id$ = this.activatedRoute.params.pipe(map(({ id }) => parseInt(id)));

  /* Actions */
  readonly clickActivate$ = new Subject<void>();

  /* Side effects */

  constructor(
    private store: Store,
    private actions: Actions,
    private activatedRoute: ActivatedRoute,
    private state: RxState<Empty>,
    private dialog: TuiDialogService,
    title: Title
  ) {
    this.state.hold(this.id$, (id) => {
      this.store.dispatch(new LoadIssueById({ id }));
    });
    const whenLoadIssueSuccess$ = this.actions
      .pipe<LoadIssueById>(ofActionSuccessful(LoadIssueById))
      .pipe(withLatestFrom(this.selectedIssue$));
    this.state.hold(whenLoadIssueSuccess$, ([, issue]) =>
      this.store.dispatch(new LoadCarById({ id: issue.carId || 0 }))
    );
    this.state.hold(this.selectedIssue$, (issue) => title.setTitle(issue.type + ' | AVC'));
  }

  openImage(template: PolymorpheusContent<TuiDialogContext>) {
    this.dialog.open(template, { size: 'l' }).pipe(take(1)).subscribe();
  }
}
