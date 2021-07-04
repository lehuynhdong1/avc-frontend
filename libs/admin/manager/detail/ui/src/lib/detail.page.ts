import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Actions, ofActionErrored, Store } from '@ngxs/store';
import { ManagerState, LoadManagerById } from '@shared/features/manager/data-access';
import { TuiStatus } from '@taiga-ui/kit';
import { RxState } from '@rx-angular/state';
import { ActivatedRoute, Router } from '@angular/router';
import { map, filter, switchMap, withLatestFrom, switchMapTo, shareReplay } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { ConfirmDialogService } from '@admin/core/ui';
import { TuiAppearance } from '@taiga-ui/core';
import { ConfirmDialogComponentParams } from '@admin/core/ui';
import { ToggleActivation } from '@shared/features/account/data-access';
import { ShowNotification, hasValue, Empty } from '@shared/util';
import { DynamicTableColumns, Id } from '@shared/ui/dynamic-table';
import { AccountReadDto, CarReadDto } from '@shared/api';

const getConfirmDialogParams: (isActivated: boolean) => ConfirmDialogComponentParams = (
  isActivated
) => ({
  content: `Do you really want to ${isActivated ? 'deactivate' : 'activate'} this manager?`,
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
  CAR_DYNAMIC_COLUMNS: DynamicTableColumns<CarReadDto> = [
    { key: 'name', title: 'Name', type: 'string' },
    { key: 'deviceId', title: 'Device ID', type: 'string' },
    { key: 'createdAt', title: 'Created at', type: 'date' },
    {
      key: 'assignTo',
      title: 'Assigned to',
      type: 'string',
      cellTemplate: '#assignTo.firstName #assignTo.lastName'
    },
    {
      key: 'isConnecting',
      title: 'Connecting Status',
      type: 'boolean',
      trueMessage: 'Connected',
      falseMessage: 'Disconnected'
    }
  ];
  STAFF_DYNAMIC_COLUMNS: DynamicTableColumns<AccountReadDto> = [
    { key: 'firstName', title: 'Full Name', type: 'string', cellTemplate: '#firstName #lastName' },
    { key: 'email', title: 'Email', type: 'string' },
    { key: 'phone', title: 'Phone', type: 'string' }
  ];
  readonly selectedManager$ = this.store.select(ManagerState.selectedManager).pipe(hasValue());
  readonly isFullPage$: Observable<boolean> = this.activatedRoute.data.pipe(
    map(({ fullPage }) => fullPage),
    shareReplay(1)
  );
  private readonly errorMessage$ = this.store.select(ManagerState.errorMessage).pipe(hasValue());
  private readonly id$ = this.activatedRoute.params.pipe(map(({ id }) => parseInt(id)));
  /* Actions */
  readonly clickActivate$ = new Subject<void>();
  readonly selectCar$ = new Subject<Id>();
  readonly selectStaff$ = new Subject<Id>();

  /* Side effects */

  private whenToggleActivationFailed$ = this.actions.pipe<ToggleActivation>(
    ofActionErrored(ToggleActivation)
  );

  constructor(
    private store: Store,
    private actions: Actions,
    private activatedRoute: ActivatedRoute,
    private state: RxState<Empty>,
    private confirmDialogService: ConfirmDialogService,
    router: Router
  ) {
    this.state.hold(this.id$, (id) => this.store.dispatch(new LoadManagerById({ id })));

    const isAvailable$ = this.selectedManager$.pipe(map((manager) => manager.isAvailable ?? false));
    const whenClickActivate$ = this.clickActivate$.pipe(
      switchMapTo(isAvailable$),
      switchMap((currentValue) =>
        this.confirmDialogService.open(
          currentValue ? 'Deactivate car' : 'Activate car',
          getConfirmDialogParams(currentValue)
        )
      ),
      filter((response) => response === 1),
      switchMapTo(isAvailable$)
    );
    this.state.hold(whenClickActivate$.pipe(withLatestFrom(this.id$)), ([currentStatus, id]) => {
      this.store.dispatch(new ToggleActivation({ id, currentValue: currentStatus }));
    });
    this.state.hold(
      this.whenToggleActivationFailed$.pipe(withLatestFrom(this.errorMessage$)),
      ([, errorMessage]) => {
        this.store.dispatch(
          new ShowNotification({
            message: errorMessage ?? 'Something',
            options: { label: errorMessage }
          })
        );
      }
    );
    this.state.hold(this.selectStaff$, (id) => router.navigateByUrl('/staff/' + id));
    this.state.hold(this.selectCar$, (id) => router.navigateByUrl('/car/' + id));
  }
}
