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
import { SignalRState } from '@shared/features/signalr/data-access';

const getConfirmDialogParams: (isActivated: boolean) => ConfirmDialogComponentParams = (
  isActivated
) => ({
  content: `Do you really want to ${isActivated ? 'deactivate' : 'activate'} this car?`,
  buttons: [
    {
      id: 1,
      label: isActivated ? 'Deactivate' : 'Activate'
    },
    {
      id: 2,
      label: 'Cancel',
      uiOptions: {
        appearance: TuiAppearance.Outline
      }
    }
  ]
});
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

  /* Configurations */
  readonly DYNAMIC_COLUMNS: DynamicTableColumns<IssueReadDto> = [
    { key: 'type', title: 'Type', type: 'string' },
    { key: 'createdAt', title: 'Created at', type: 'date' },
    { key: 'description', title: 'Description', type: 'string' }
  ];
  readonly selectedCar$ = this.store.select(CarState.selectedCar).pipe(hasValue());
  readonly backTo$ = this.activatedRoute.queryParams.pipe(map(({ backTo }) => backTo));
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

    this.clickActivationEffects();
    this.toggleActivationAndApproveSuccessEffects();
    this.toggleActivationFailedEffects();
    this.selectIssueEffect();
    this.signalrEffect();
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
  private toggleActivationFailedEffects() {
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
  private clickActivationEffects() {
    const whenClickActivate$ = this.clickActivate$.pipe(
      switchMap((currentValue) =>
        this.confirmDialogService
          .open(
            currentValue ? 'Deactivate car' : 'Activate car',
            getConfirmDialogParams(currentValue)
          )
          .pipe(filter((response) => response === 1))
      )
    );
    this.state.hold(whenClickActivate$, () => {
      this.store.dispatch(new ToggleActivation());
    });
  }

  private selectIssueEffect() {
    this.state.hold(
      this.selectIssue$.pipe(hasValue(), withLatestFrom(this.id$)),
      ([issueId, carId]) =>
        this.router.navigate(['issues', issueId], {
          relativeTo: this.activatedRoute,
          queryParams: { backTo: `/car/detail/${carId}` }
        })
    );
  }

  private signalrEffect() {
    type WhenCarNotify =
      | 'WhenCarConnected'
      | 'WhenCarDisconnected'
      | 'WhenCarRunning'
      | 'WhenCarStopping'
      | 'WhenIssueCreated'
      | 'WhenManagerChangeAssignedCar'
      | 'WhenCarDeactivated';

    const carNotifys = [
      'WhenCarConnected',
      'WhenCarDisconnected',
      'WhenCarRunning',
      'WhenCarStopping',
      'WhenIssueCreated'
    ];
    // Merge all to archive only 1 subscription for notification
    const whenCarNotifyMustFetchNewData$ = merge(
      ...carNotifys.map((key) => {
        const typedKey = key as WhenCarNotify;
        return this.store.select(SignalRState.get(typedKey)).pipe(
          hasValue(),
          withLatestFrom(this.id$),
          filter(([{ carId }, id]) => carId === id)
        );
      })
    );
    this.state.hold(whenCarNotifyMustFetchNewData$, ([, id]) =>
      this.store.dispatch(new LoadCarById({ id }))
    );

    const carNotifyMustBack = [
      'WhenManagerChangeAssignedCar',
      'WhenAdminChangeCarManagedBy',
      'WhenCarDeactivated'
    ];

    const whenCarNotifyMustBack$ = merge(
      ...carNotifyMustBack.map((key) => {
        const typedKey = key as WhenCarNotify;
        return this.store.select(SignalRState.get(typedKey)).pipe(
          hasValue(),
          withLatestFrom(this.id$),
          filter(([{ carId }, id]) => carId === id)
        );
      })
    );
    this.state.hold(whenCarNotifyMustBack$, () => {
      this.store.dispatch(new LoadApprovedCars({ limit: 10 }));
      this.router.navigateByUrl('/car');
    });
  }
}
