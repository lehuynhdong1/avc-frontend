import { Component, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Actions, ofActionErrored, ofActionSuccessful, Store } from '@ngxs/store';
import { ChangePassword, ManageProfileState } from '@shared/features/manage-profile/data-access';
import { RxState } from '@rx-angular/state';
import { withLatestFrom, map, filter, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TuiNotification } from '@taiga-ui/core';
import { ShowNotification, hasValue, Empty, CanShowUnsavedDialog } from '@shared/util';
import { TuiInputType } from '@taiga-ui/cdk';
import { MatchValidator } from '@shared/auth/util';

@Component({
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class ChangePasswordPage implements CanShowUnsavedDialog {
  readonly TUI_INPUT_PASSWORD = TuiInputType.Password as const;

  willShowUnsavedDialog = false;

  readonly form = this.formBuilder.group({
    oldPassword: ['', Validators.required],
    newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
    confirmedPassword: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
        MatchValidator('newPassword')
      ]
    ]
  });

  private readonly errorMessage$ = this.store
    .select(ManageProfileState.errorMessage)
    .pipe(hasValue());

  formHasChanged$ = this.form.valueChanges.pipe(
    map(() => this.willShowUnsavedDialog),
    distinctUntilChanged()
  );

  /* Actions */
  readonly clickChange$ = new Subject<void>();

  /* Side effects */
  private whenChangeSuccess$ = this.actions.pipe<ChangePassword>(
    ofActionSuccessful(ChangePassword)
  );
  private whenChangeFailed$ = this.actions.pipe<ChangePassword>(ofActionErrored(ChangePassword));

  constructor(
    private store: Store,
    private actions: Actions,
    private state: RxState<Empty>,
    private formBuilder: FormBuilder
  ) {
    this.declareChangeSideEffects();
  }

  private declareChangeSideEffects() {
    const whenChangeValid$ = this.clickChange$.pipe(
      filter(() => this.form.valid),
      map(() => this.form.value)
    );
    this.state.hold(whenChangeValid$, (form) => {
      const { oldPassword, newPassword } = form;
      this.store.dispatch(
        new ChangePassword({ profilePasswordUpdateDto: { oldPassword, newPassword } })
      );
    });
    const messagesWhenFailed$ = this.whenChangeFailed$.pipe(withLatestFrom(this.errorMessage$));
    this.state.hold(messagesWhenFailed$, ([, errorMessage]) => {
      this.store.dispatch(
        new ShowNotification({
          message: errorMessage,
          options: { label: 'Change Password', status: TuiNotification.Error }
        })
      );
    });
    this.state.hold(this.whenChangeSuccess$, () =>
      this.store.dispatch([
        new ShowNotification({
          message: `Your password has been changed successfully.`,
          options: { label: 'Change Password', status: TuiNotification.Success, hasIcon: true }
        })
      ])
    );
    this.state.hold(this.formHasChanged$, () => (this.willShowUnsavedDialog = true));
  }
}
