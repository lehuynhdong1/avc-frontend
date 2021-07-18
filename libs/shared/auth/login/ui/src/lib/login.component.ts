import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Store, Actions, ofActionSuccessful, ofActionErrored } from '@ngxs/store';
import { Login, LoginState } from '@shared/auth/login/data-access';
import { TuiInputType } from '@taiga-ui/cdk';
import { Validators, FormBuilder } from '@angular/forms';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { filter, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'adc-frontend-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class SharedLoginComponent {
  tuiEmailType = TuiInputType.Email;

  form = this.formBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required],
    remember: [true]
  });

  @Input()
  set defaultInfo(info: Partial<Login['payload']['params']>) {
    this.form.patchValue(info);
  }

  @Output() login = new EventEmitter<Login['payload']['params']>();
  @Output() whenLoginSuccess = new EventEmitter<void>();
  @Output() whenLoginFailed = new EventEmitter<string>();

  loading$ = this.state.select('loading');

  login$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private state: RxState<{ loading: boolean }>,
    store: Store,
    actions: Actions
  ) {
    state.hold(this.login$.pipe(filter(() => this.form.valid)), () => {
      state.set({ loading: true });
      const params: Login['payload']['params'] = {
        email: this.form.value.email,
        password: this.form.value.password
      };
      this.login.emit(params);
    });

    const whenSendFailed$ = actions
      .pipe<Login>(ofActionErrored(Login))
      .pipe(withLatestFrom(store.select(LoginState.errorMessage)));
    state.hold(whenSendFailed$, ([, errorMessage]) => {
      state.set({ loading: false });
      this.whenLoginFailed.emit(errorMessage);
    });

    const whenSendSuccess$ = actions.pipe<Login>(ofActionSuccessful(Login));
    state.hold(whenSendSuccess$, () => {
      state.set({ loading: false });
      this.whenLoginSuccess.emit();
    });
  }
}
