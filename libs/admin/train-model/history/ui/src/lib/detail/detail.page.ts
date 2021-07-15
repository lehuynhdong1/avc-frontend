import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Actions, ofActionErrored, ofActionSuccessful, Store } from '@ngxs/store';
import { CarState, LoadCarById } from '@shared/features/car/data-access';
import { TuiStatus } from '@taiga-ui/kit';
import { RxState } from '@rx-angular/state';
import { ActivatedRoute, Router } from '@angular/router';
import { map, filter, switchMap, withLatestFrom, shareReplay } from 'rxjs/operators';
import { merge, Observable, Subject } from 'rxjs';
import { hasValue, Empty } from '@shared/util';
import { LoginState } from '@shared/auth/login/data-access';
import { Id } from '@shared/ui/dynamic-table';

@Component({
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class DetailPage {
  TUI_STATUS = {
    ERROR: TuiStatus.Error,
    WARNING: TuiStatus.Warning,
    SUCCESS: TuiStatus.Success,
    PRIMARY: TuiStatus.Primary
  };

  readonly selectedCar$ = this.store.select(CarState.selectedCar).pipe(hasValue());
  readonly isAdmin$ = this.store.select(LoginState.account).pipe(
    map((my) => my?.role === 'Admin'),
    shareReplay(1)
  );
  private readonly errorMessage$ = this.store.select(CarState.errorMessage).pipe(hasValue());
  private readonly id$ = this.activatedRoute.params.pipe(map(({ id }) => parseInt(id)));
  readonly isFullPage$: Observable<boolean> = this.activatedRoute.data.pipe(
    map(({ fullPage }) => fullPage),
    shareReplay(1)
  );

  /* Actions */
  readonly clickActivate$ = new Subject<boolean>();
  readonly clickApprove$ = new Subject<boolean>();
  readonly selectIssue$ = new Subject<Id>();

  /* Side effects */
  constructor(
    private store: Store,
    private actions: Actions,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private state: RxState<Empty>
  ) {
    this.state.hold(this.id$, (id) => this.store.dispatch(new LoadCarById({ id })));

    this.selectIssueEffect();
  }

  private selectIssueEffect() {
    this.state.hold(this.selectIssue$, (id) => this.router.navigateByUrl('/issue/' + id));
  }
}
