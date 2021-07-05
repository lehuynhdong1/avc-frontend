import { switchMapTo } from 'rxjs/operators';
import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Store, Actions, ofActionErrored, ofActionSuccessful } from '@ngxs/store';
import { ForgotPasswordState, SendRecoveryLink } from '@shared/auth/forgot-password/data-access';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { Validators, FormBuilder } from '@angular/forms';
import { TuiEmailAutofillName, TuiInputType } from '@taiga-ui/cdk';
import { TuiHintMode } from '@taiga-ui/core';

@Component({
  selector: 'adc-frontend-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class SharedForgotPasswordComponent {
  @Output() clickSubmit = new EventEmitter<string>();
  @Output() whenFailed = new EventEmitter<string>();
  @Output() whenSuccess = new EventEmitter<void>();

  TUI_INPUT_EMAIL = TuiInputType.Email;
  TUI_HINT_ERROR = TuiHintMode.Error;
  TUI_AUTOFILL_EMAIL = TuiEmailAutofillName.Email;

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  });

  loading$ = this.state.select('loading');

  /* Actions */
  sendRecoveryLink$ = new Subject<void>();

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private state: RxState<{ loading: boolean }>,
    actions: Actions
  ) {
    const whenSendSuccess$ = actions.pipe<SendRecoveryLink>(ofActionSuccessful(SendRecoveryLink));
    state.hold(whenSendSuccess$, () => {
      this.state.set({ loading: false });
      this.whenSuccess.emit();
    });

    const whenSendFailed$ = actions
      .pipe<SendRecoveryLink>(ofActionErrored(SendRecoveryLink))
      .pipe(switchMapTo(this.store.select(ForgotPasswordState.errorMessage)));
    state.hold(whenSendFailed$, (errorMessage) => {
      this.state.set({ loading: false });
      this.whenFailed.emit(errorMessage || '');
    });

    state.hold(this.sendRecoveryLink$, () => {
      this.state.set({ loading: true });
      const email = this.form.value.email;
      this.store.dispatch(new SendRecoveryLink({ email }));
    });
  }
}
