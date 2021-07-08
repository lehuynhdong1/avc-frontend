import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Actions, ofActionErrored, Store } from '@ngxs/store';
import { StaffState, LoadStaffById } from '@shared/features/staff/data-access';
import { TuiStatus } from '@taiga-ui/kit';
import { RxState } from '@rx-angular/state';
import { ActivatedRoute, Router } from '@angular/router';
import { map, filter, switchMap, withLatestFrom, mapTo, shareReplay, share } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { ConfirmDialogService } from '@shared/ui/confirm-dialog';
import { TuiAppearance } from '@taiga-ui/core';
import { ConfirmDialogComponentParams } from '@shared/ui/confirm-dialog';
import { ToggleActivation } from '@shared/features/account/data-access';
import { ShowNotification, hasValue, Empty } from '@shared/util';
import { Title } from '@angular/platform-browser';
import { DynamicTableColumns, Id } from '@shared/ui/dynamic-table';
import { CarAssignedReadDto } from '@shared/api';
import { LoginState } from '@shared/auth/login/data-access';

const getConfirmDialogParams: (isActivated: boolean) => ConfirmDialogComponentParams = (
  isActivated
) => ({
  content: `Do you really want to ${isActivated ? 'deactivate' : 'activate'} this staff?`,
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
  readonly TUI_STATUS = {
    ERROR: TuiStatus.Error,
    WARNING: TuiStatus.Warning,
    SUCCESS: TuiStatus.Success,
    PRIMARY: TuiStatus.Primary
  };
  CAR_DYNAMIC_COLUMNS: DynamicTableColumns<CarAssignedReadDto> = [
    { key: 'name', title: 'Name', type: 'string' },
    { key: 'deviceId', title: 'Device ID', type: 'string' },
    { key: 'createdAt', title: 'Created at', type: 'date' },
    {
      key: 'isConnecting',
      title: 'Connecting Status',
      type: 'boolean',
      trueMessage: 'Connected',
      falseMessage: 'Disconnected'
    }
  ];
  readonly selectedStaff$ = this.store.select(StaffState.selectedStaff).pipe(hasValue());
  readonly isFullPage$: Observable<boolean> = this.activatedRoute.data.pipe(
    map(({ fullPage }) => fullPage),
    shareReplay(1)
  );
  readonly isAdmin$ = this.store.select(LoginState.account).pipe(
    map((my) => my?.role === 'Admin'),
    share()
  );
  private readonly errorMessage$ = this.store.select(StaffState.errorMessage).pipe(hasValue());
  readonly selectCar$ = new Subject<Id>();

  /* Actions */
  readonly clickActivate$ = new Subject<void>();

  /* Side effects */
  private whenClickActivate$ = this.clickActivate$.pipe(
    withLatestFrom(this.selectedStaff$),
    switchMap(([, staff]) =>
      this.confirmDialogService
        .open(
          staff.isAvailable ? 'Deactivate car' : 'Activate car',
          getConfirmDialogParams(staff.isAvailable || false)
        )
        .pipe(
          filter((response) => response === 1),
          mapTo(staff)
        )
    )
  );
  private whenToggleActivationFailed$ = this.actions.pipe<ToggleActivation>(
    ofActionErrored(ToggleActivation)
  );

  constructor(
    private store: Store,
    private actions: Actions,
    private state: RxState<Empty>,
    private confirmDialogService: ConfirmDialogService,
    private activatedRoute: ActivatedRoute,
    router: Router,
    title: Title
  ) {
    const id$ = activatedRoute.params.pipe(map(({ id }) => parseInt(id)));
    this.state.hold(id$, (id) => this.store.dispatch(new LoadStaffById({ id })));
    this.state.hold(this.selectedStaff$, (staff) => {
      title.setTitle(staff?.firstName + ' ' + staff?.lastName + ' | AVC');
    });
    this.state.hold(this.whenClickActivate$, ({ id = 0, isAvailable = false }) =>
      this.store.dispatch(new ToggleActivation({ id, currentValue: isAvailable || false }))
    );
    this.state.hold(
      this.whenToggleActivationFailed$.pipe(
        withLatestFrom(this.selectedStaff$, this.errorMessage$)
      ),
      ([, staff, errorMessage]) => {
        this.store.dispatch(
          new ShowNotification({
            message: errorMessage,
            options: {
              label: `${staff.isAvailable ? 'Deactivate' : 'Activate'} ${staff.firstName} ${
                staff.lastName
              }`
            }
          })
        );
      }
    );
    this.state.hold(this.selectCar$, (id) => router.navigateByUrl('/car/' + id));
  }
}
