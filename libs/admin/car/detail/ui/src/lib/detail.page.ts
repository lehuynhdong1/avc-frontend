import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Actions, ofActionErrored, Store } from '@ngxs/store';
import { CarState, LoadCarById } from '@shared/features/car/data-access';
import { TuiStatus } from '@taiga-ui/kit';
import { RxState } from '@rx-angular/state';
import { ActivatedRoute } from '@angular/router';
import { map, filter, switchMap, withLatestFrom, shareReplay } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { ConfirmDialogService } from '@admin/core/ui';
import { TuiAppearance } from '@taiga-ui/core';
import { ConfirmDialogComponentParams } from '@admin/core/ui';
import { ToggleActivation } from '@shared/features/account/data-access';
import { ShowNotification, hasValue } from '@shared/util';

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

  readonly selectedCar$ = this.store.select(CarState.selectedCar).pipe(hasValue());
  private readonly errorMessage$ = this.store.select(CarState.errorMessage).pipe(hasValue());
  private readonly id$ = this.activatedRoute.params.pipe(map(({ id }) => parseInt(id)));
  readonly isFullPage$: Observable<boolean> = this.activatedRoute.data.pipe(
    map(({ fullPage }) => fullPage),
    shareReplay(1)
  );

  /* Actions */
  readonly clickActivate$ = new Subject<boolean>();

  /* Side effects */
  private whenClickActivate$ = this.clickActivate$.pipe(
    switchMap((currentValue) =>
      this.confirmDialogService
        .open(
          currentValue ? 'Deactivate car' : 'Activate car',
          getConfirmDialogParams(currentValue)
        )
        .pipe(
          filter((response) => response === 1),
          map(() => currentValue)
        )
    )
  );
  private whenToggleActivationFailed$ = this.actions.pipe<ToggleActivation>(
    ofActionErrored(ToggleActivation)
  );

  constructor(
    private store: Store,
    private actions: Actions,
    private activatedRoute: ActivatedRoute,
    private state: RxState<Record<string, never>>,
    private confirmDialogService: ConfirmDialogService
  ) {
    this.state.hold(this.id$, (id) => this.store.dispatch(new LoadCarById({ id })));
    this.state.hold(
      this.whenClickActivate$.pipe(withLatestFrom(this.id$)),
      ([currentStatus, id]) => {
        this.store.dispatch(new ToggleActivation({ id, currentValue: currentStatus }));
      }
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
  }

  approveCar() {
    // #TODO: Approve car feature
  }
  toggleActivation(event: Event, currentValue: boolean | null | undefined) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.clickActivate$.next(currentValue || false);
  }
}
