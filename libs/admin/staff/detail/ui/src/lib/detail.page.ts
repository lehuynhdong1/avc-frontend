import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Actions, ofActionErrored, Store } from '@ngxs/store';
import { StaffState, LoadStaffById } from '@shared/features/staff/data-access';
import { TuiStatus } from '@taiga-ui/kit';
import { RxState } from '@rx-angular/state';
import { ActivatedRoute } from '@angular/router';
import { map, filter, switchMap, withLatestFrom } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ConfirmDialogService } from '@admin/core/ui';
import { TuiAppearance } from '@taiga-ui/core';
import { ConfirmDialogComponentParams } from '@admin/core/ui';
import { ToggleActivation } from '@shared/features/account/data-access';
import { ShowNotification, hasValue } from '@shared/util';
import { Title } from '@angular/platform-browser';

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
  TUI_STATUS = {
    ERROR: TuiStatus.Error,
    WARNING: TuiStatus.Warning,
    SUCCESS: TuiStatus.Success,
    PRIMARY: TuiStatus.Primary
  };
  readonly form = this.formBuilder.group({
    isAvailable: [false, Validators.required],
    cars: [[1, 2]]
  });
  readonly selectedStaff$ = this.store.select(StaffState.selectedStaff).pipe(hasValue());
  private readonly errorMessage$ = this.store.select(StaffState.errorMessage).pipe(hasValue());
  private readonly id$ = this.activatedRoute.params.pipe(map(({ id }) => parseInt(id)));

  /* Actions */
  readonly clickActivate$ = new Subject<void>();

  /* Side effects */
  private whenClickActivate$ = this.clickActivate$.pipe(
    map(() => this.form.value.isAvailable),
    switchMap((currentValue) =>
      this.confirmDialogService.open(
        currentValue ? 'Deactivate car' : 'Activate car',
        getConfirmDialogParams(currentValue)
      )
    ),
    filter((response) => response === 1),
    map(() => this.form.value.isAvailable)
  );
  private whenToggleActivationFailed$ = this.actions.pipe<ToggleActivation>(
    ofActionErrored(ToggleActivation)
  );

  constructor(
    private store: Store,
    private actions: Actions,
    private activatedRoute: ActivatedRoute,
    private state: RxState<Record<string, never>>,
    private formBuilder: FormBuilder,
    private confirmDialogService: ConfirmDialogService,
    private title: Title
  ) {
    this.state.hold(this.id$, (id) => this.store.dispatch(new LoadStaffById({ id })));
    this.state.hold(this.selectedStaff$, (staff) => {
      title.setTitle(staff?.firstName + ' ' + staff?.lastName + ' | AVC');
      this.form.patchValue({ isAvailable: staff?.isAvailable });
    });
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
}
