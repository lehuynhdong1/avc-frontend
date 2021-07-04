import { switchMapTo } from 'rxjs/operators';
import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Store, Actions, ofActionErrored, ofActionSuccessful } from '@ngxs/store';
import { ForgotPasswordState, SendRecoveryLink } from '@shared/auth/forgot-password/data-access';
import { Empty } from '@shared/util';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { Validators, FormBuilder } from '@angular/forms';
import { TuiInputType } from '@taiga-ui/cdk';
import { TuiHintMode } from '@taiga-ui/core';

@Component({
  selector: 'adc-frontend-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    RxState,
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Email address is required!',
        email: 'Please enter a valid email address'
      }
    }
  ]
})
export class SharedForgotPasswordComponent {
  @Output() clickSubmit = new EventEmitter<string>();
  @Output() whenFailed = new EventEmitter<string>();
  @Output() whenSuccess = new EventEmitter<void>();

  TUI_INPUT_EMAIL = TuiInputType.Email;
  TUI_HINT_ERROR = TuiHintMode.Error;

  form = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]]
  });

  /* Side effects */

  /* Actions */
  sendRecoveryLink$ = new Subject<void>();

  constructor(
    private store: Store,
    private actions: Actions,
    state: RxState<Empty>,
    private formBuilder: FormBuilder
  ) {
    const whenSendSuccess$ = this.actions.pipe<SendRecoveryLink>(
      ofActionSuccessful(SendRecoveryLink)
    );
    state.hold(whenSendSuccess$, () => () => this.whenSuccess.emit());

    const whenSendFailed$ = this.actions
      .pipe<SendRecoveryLink>(ofActionErrored(SendRecoveryLink))
      .pipe(switchMapTo(this.store.select(ForgotPasswordState.errorMessage)));
    state.hold(whenSendFailed$, (errorMessage) => this.whenFailed.emit(errorMessage || ''));

    state.hold(this.sendRecoveryLink$, () => {
      const email = this.form.value.email;
      this.store.dispatch(new SendRecoveryLink({ email }));
    });
  }
}
