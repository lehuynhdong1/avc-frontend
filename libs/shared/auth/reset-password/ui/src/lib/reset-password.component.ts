import { withLatestFrom, map } from 'rxjs/operators';
import { RxState } from '@rx-angular/state';
import { Actions, Store, ofActionErrored, ofActionSuccessful } from '@ngxs/store';
import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { TuiNotification } from '@taiga-ui/core';
import { Subject } from 'rxjs';
import { CreateNewPassword, ResetPasswordState } from '@shared/auth/reset-password/data-access';
import { ActivatedRoute, Router } from '@angular/router';
import { tuiPure } from '@taiga-ui/cdk';
import { MatchValidator } from '@shared/auth/util';
import { ShowNotification } from '@shared/util';

@Component({
  selector: 'adc-frontend-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class SharedResetPasswordComponent {
  @Output() clickSubmit = new EventEmitter<void>();
  @Output() whenFailed = new EventEmitter<string>();
  @Output() whenSuccess = new EventEmitter<void>();

  TUI_NOTIFICATION_INFOR = TuiNotification.Info;

  form = this.formBuilder.group({
    email: ['', Validators.required],
    code: ['', [Validators.required, Validators.minLength(6)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(16)]],
    confirmedPassword: [
      '',
      [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
        MatchValidator('password')
      ]
    ]
  });

  loading$ = this.state.select('loading');

  reset$ = new Subject<void>();

  constructor(
    store: Store,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private state: RxState<{ loading: boolean }>,
    actions: Actions,
    router: Router
  ) {
    const emailAndCode$ = this.activatedRoute.queryParams.pipe(
      map(({ email, code }) => ({ email, code }))
    );
    state.hold(emailAndCode$, ({ code, email }) => this.form.patchValue({ code, email }));

    const whenSendSuccess$ = actions.pipe<CreateNewPassword>(ofActionSuccessful(CreateNewPassword));
    state.hold(whenSendSuccess$, () => {
      this.state.set({ loading: false });
      store.dispatch(
        new ShowNotification({
          message: "You have reset your password. Let's log in with new password",
          options: { label: 'Reset Password', status: TuiNotification.Success }
        })
      );
      router.navigate(['..', 'login'], { relativeTo: this.activatedRoute });
    });

    const whenSendFailed$ = actions
      .pipe<CreateNewPassword>(ofActionErrored(CreateNewPassword))
      .pipe(withLatestFrom(store.select(ResetPasswordState.errorMessage)));
    state.hold(whenSendFailed$, ([, errorMessage]) => {
      this.state.set({ loading: false });
      store.dispatch(
        new ShowNotification({
          message: errorMessage || '',
          options: { label: 'Reset Password', status: TuiNotification.Error }
        })
      );
    });

    state.hold(this.reset$, () => {
      this.state.set({ loading: true });
      const { code, password, email } = this.form.value;
      store.dispatch(
        new CreateNewPassword({ newPasswordDto: { securityKey: code, password, email } })
      );
      this.clickSubmit.emit();
    });
  }

  @tuiPure
  isValid(form: AbstractControl | null | undefined): boolean | undefined {
    return form?.touched && form?.invalid;
  }
}
