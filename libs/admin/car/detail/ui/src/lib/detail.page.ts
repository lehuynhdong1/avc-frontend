import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Actions, ofActionErrored, Store } from '@ngxs/store';
import {
  CarState,
  LoadApprovedCars,
  LoadCarById,
  ToggleActivation,
  ToggleApprove
} from '@shared/features/car/data-access';
import { TuiStatus } from '@taiga-ui/kit';
import { RxState } from '@rx-angular/state';
import { ActivatedRoute } from '@angular/router';
import { map, filter, switchMap, withLatestFrom, shareReplay, switchMapTo } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ConfirmDialogService } from '@admin/core/ui';
import { TuiAppearance } from '@taiga-ui/core';
import { ConfirmDialogComponentParams } from '@admin/core/ui';
import { ShowNotification, hasValue, Empty } from '@shared/util';
import { IssueReadDto } from '@shared/api';
import { DynamicTableColumns } from '@shared/ui/dynamic-table';

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
  private readonly errorMessage$ = this.store.select(CarState.errorMessage).pipe(hasValue());
  private readonly id$ = this.activatedRoute.params.pipe(map(({ id }) => parseInt(id)));
  readonly isFullPage$: Observable<boolean> = this.activatedRoute.data.pipe(
    map(({ fullPage }) => fullPage),
    shareReplay(1)
  );

  /* Actions */
  readonly clickActivate$ = new Subject<boolean>();
  readonly clickApprove$ = new Subject<boolean>();

  /* Side effects */
  private whenClickActivate$ = this.clickActivate$.pipe(
    switchMap((currentValue) =>
      this.confirmDialogService
        .open(
          currentValue ? 'Deactivate car' : 'Activate car',
          getConfirmDialogParams('isAvailable', currentValue)
        )
        .pipe(
          filter((response) => response === 1),
          switchMapTo(this.isFullPage$)
        )
    )
  );
  private whenClickApprove$ = this.clickApprove$.pipe(
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
  private whenToggleActivationFailed$ = this.actions.pipe<ToggleActivation>(
    ofActionErrored(ToggleActivation)
  );
  private whenToggleApproveFailed$ = this.actions.pipe<ToggleApprove>(
    ofActionErrored(ToggleApprove)
  );

  constructor(
    private store: Store,
    private actions: Actions,
    private activatedRoute: ActivatedRoute,
    private state: RxState<Empty>,
    private confirmDialogService: ConfirmDialogService
  ) {
    this.state.hold(this.id$, (id) => this.store.dispatch(new LoadCarById({ id })));
    this.state.hold(this.whenClickActivate$, (isFullPage) => {
      if (!isFullPage) this.store.dispatch(new LoadApprovedCars({ limit: 10 }));
      this.store.dispatch(new ToggleActivation());
    });
    this.state.hold(this.whenClickApprove$, ([currentValue, id]) =>
      this.store.dispatch(new ToggleApprove({ id, isApproved: !currentValue }))
    );
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
    this.state.hold(
      this.whenToggleApproveFailed$.pipe(withLatestFrom(this.errorMessage$)),
      ([, errorMessage]) => {
        this.store.dispatch(
          new ShowNotification({
            message: errorMessage ?? 'Something',
            options: { label: errorMessage }
          })
        );
      }
    );
  }
}
