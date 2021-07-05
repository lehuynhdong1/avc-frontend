import { Component, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { Store, Actions, ofActionSuccessful, ofActionErrored } from '@ngxs/store';
import { Login, LoginState } from '@shared/auth/login/data-access';
import { TuiInputType } from '@taiga-ui/cdk';
import { Validators, FormBuilder } from '@angular/forms';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { filter, switchMapTo } from 'rxjs/operators';

@Component({
  selector: 'adc-frontend-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class SharedLoginComponent {
  @Output() clickSubmit = new EventEmitter<void>();
  @Output() whenFailed = new EventEmitter<string>();
  @Output() whenSuccess = new EventEmitter<void>();

  tuiEmailType = TuiInputType.Email;
  form = this.formBuilder.group({
    email: ['minhhuy499@gmail.com', [Validators.required, Validators.email]],
    password: ['123456', Validators.required],
    remember: [true]
  });

  loading$ = this.state.select('loading');

  login$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private state: RxState<{ loading: boolean }>,
    store: Store,
    actions: Actions
  ) {
    this.state.hold(this.login$.pipe(filter(() => this.form.valid)), () => {
      this.state.set({ loading: true });
      const payload: Login['payload'] = {
        email: this.form.value.email,
        password: this.form.value.password
      };
      store.dispatch(new Login(payload));
    });

    const whenSendFailed$ = actions
      .pipe<Login>(ofActionErrored(Login))
      .pipe(switchMapTo(store.select(LoginState.errorMessage)));
    state.hold(whenSendFailed$, (errorMessage) => {
      this.state.set({ loading: false });
      this.whenFailed.emit(errorMessage || '');
    });

    const whenSendSuccess$ = actions.pipe<Login>(ofActionSuccessful(Login));
    state.hold(whenSendSuccess$, () => {
      this.state.set({ loading: false });
      this.whenSuccess.emit();
    });
  }
}
