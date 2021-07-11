import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Actions, ofActionErrored, ofActionSuccessful, Store } from '@ngxs/store';
import {
  CarState,
  LoadApprovedCars,
  LoadCarById,
  ToggleActivation,
  ToggleApprove
} from '@shared/features/car/data-access';
import { TuiStatus } from '@taiga-ui/kit';
import { RxState } from '@rx-angular/state';
import { ActivatedRoute, Router } from '@angular/router';
import { map, filter, switchMap, withLatestFrom, shareReplay } from 'rxjs/operators';
import { merge, Observable, Subject } from 'rxjs';
import { TuiAppearance } from '@taiga-ui/core';
import { ShowNotification, hasValue, Empty } from '@shared/util';
import { IssueReadDto } from '@shared/api';
import { DynamicTableColumns, Id } from '@shared/ui/dynamic-table';
import { ConfirmDialogService, ConfirmDialogComponentParams } from '@shared/ui/confirm-dialog';
import { LoginState } from '@shared/auth/login/data-access';

const getConfirmDialogParams: (
  type: 'isAvailable' | 'isApproved',
  isActivated: boolean
) => ConfirmDialogComponentParams = (type, isActivated) => {
  const mapper = {
    isAvailable: ['Activate', 'Deactivate'],
    isApproved: ['Approve', 'Reject']
  };
  return {
    content: `Do you really want to ${isActivated ? mapper[type][1] : mapper[type][0]} this car?`,
    buttons: [
      { id: 1, label: isActivated ? mapper[type][1] : mapper[type][0] },
      { id: 2, label: 'Cancel', uiOptions: { appearance: TuiAppearance.Outline } }
    ]
  };
};
@Component({
  selector: 'adca-detail',
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

  /* Configurations */
  readonly DYNAMIC_COLUMNS: DynamicTableColumns<IssueReadDto> = [
    { key: 'type', title: 'Type', type: 'string' },
    { key: 'createdAt', title: 'Created at', type: 'date' },
    { key: 'description', title: 'Description', type: 'string' },
    { key: 'location', title: 'Location', type: 'string' }
  ];
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
    private state: RxState<Empty>,
    private confirmDialogService: ConfirmDialogService
  ) {
    this.state.hold(this.id$, (id) => this.store.dispatch(new LoadCarById({ id })));

    this.clickApproveEffects();
    this.clickActivationEffects();
    this.toggleActivationAndApproveSuccessEffects();
    this.toggleActivationFailedSuccessEffects();
    this.toggleApproveSuccessEffects();
    this.selectIssueEffect();
  }

  private toggleActivationAndApproveSuccessEffects() {
    const whenToggleActivationSuccess$ = this.actions.pipe<ToggleActivation>(
      ofActionSuccessful(ToggleActivation)
    );
    const whenToggleApproveSuccess$ = this.actions.pipe<ToggleApprove>(
      ofActionSuccessful(ToggleApprove)
    );
    this.state.hold(
      merge(whenToggleActivationSuccess$, whenToggleApproveSuccess$).pipe(
        withLatestFrom(this.isFullPage$),
        filter(([, isFullPage]) => !isFullPage)
      ),
      () => this.store.dispatch(new LoadApprovedCars({ limit: 10 }))
    );
  }
  private toggleActivationFailedSuccessEffects() {
    const whenToggleActivationFailed$ = this.actions
      .pipe<ToggleActivation>(ofActionErrored(ToggleActivation))
      .pipe(withLatestFrom(this.errorMessage$));
    this.state.hold(whenToggleActivationFailed$, ([, errorMessage]) =>
      this.store.dispatch(
        new ShowNotification({
          message: errorMessage ?? 'Error',
          options: { label: errorMessage }
        })
      )
    );
  }
  private toggleApproveSuccessEffects() {
    const whenToggleApproveFailed$ = this.actions
      .pipe<ToggleApprove>(ofActionErrored(ToggleApprove))
      .pipe(withLatestFrom(this.errorMessage$));
    this.state.hold(whenToggleApproveFailed$, ([, errorMessage]) =>
      this.store.dispatch(
        new ShowNotification({
          message: errorMessage ?? 'Error',
          options: { label: errorMessage }
        })
      )
    );
  }
  private clickApproveEffects() {
    const whenClickApprove$ = this.clickApprove$.pipe(
      switchMap((currentValue) =>
        this.confirmDialogService
          .open(
            currentValue ? 'Reject car' : 'Approve car',
            getConfirmDialogParams('isApproved', currentValue)
          )
          .pipe(
            filter((response) => response === 1),
            map(() => currentValue)
          )
      ),
      withLatestFrom(this.id$)
    );

    this.state.hold(whenClickApprove$, ([currentValue, id]) =>
      this.store.dispatch(new ToggleApprove({ id, isApproved: !currentValue }))
    );
  }
  private clickActivationEffects() {
    const whenClickActivate$ = this.clickActivate$.pipe(
      switchMap((currentValue) =>
        this.confirmDialogService
          .open(
            currentValue ? 'Deactivate car' : 'Activate car',
            getConfirmDialogParams('isAvailable', currentValue)
          )
          .pipe(filter((response) => response === 1))
      )
    );
    this.state.hold(whenClickActivate$, () => {
      this.store.dispatch(new ToggleActivation());
    });
  }

  private selectIssueEffect() {
    this.state.hold(this.selectIssue$, (id) => this.router.navigateByUrl('/issue/' + id));
  }
}
