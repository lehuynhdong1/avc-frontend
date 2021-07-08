import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, Actions, ofActionSuccessful, ofActionErrored } from '@ngxs/store';
import { Login, LoginState } from '@shared/auth/login/data-access';
import { TuiInputType } from '@taiga-ui/cdk';
import { Validators, FormBuilder } from '@angular/forms';
import { RxState } from '@rx-angular/state';
import { Subject } from 'rxjs';
import { filter, withLatestFrom } from 'rxjs/operators';
import { ShowNotification } from '@shared/util';
import { TuiNotification } from '@taiga-ui/core';
import { Router } from '@angular/router';

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
    actions: Actions,
    router: Router
  ) {
    state.hold(this.login$.pipe(filter(() => this.form.valid)), () => {
      state.set({ loading: true });
      const payload: Login['payload'] = {
        email: this.form.value.email,
        password: this.form.value.password
      };
      store.dispatch(new Login(payload));
    });

    const whenSendFailed$ = actions
      .pipe<Login>(ofActionErrored(Login))
      .pipe(withLatestFrom(store.select(LoginState.errorMessage)));
    state.hold(whenSendFailed$, ([, errorMessage]) => {
      state.set({ loading: false });
      store.dispatch(
        new ShowNotification({
          message: errorMessage || '',
          options: { label: 'Login', status: TuiNotification.Error }
        })
      );
    });

    const whenSendSuccess$ = actions.pipe<Login>(ofActionSuccessful(Login));
    state.hold(whenSendSuccess$, () => {
      state.set({ loading: false });
      store.dispatch(
        new ShowNotification({
          message: 'Have a good time',
          options: { label: "You're logged in", status: TuiNotification.Success }
        })
      );
      router.navigateByUrl('/');
    });
  }
}
