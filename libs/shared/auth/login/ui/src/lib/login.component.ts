import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import {
  Store,
  Actions,
  ofActionSuccessful,
  ofActionErrored,
  ofActionDispatched
} from '@ngxs/store';
import { Login, LoginState } from '@shared/auth/login/data-access';
import { TuiInputType } from '@taiga-ui/cdk';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ShowNotification } from '@shared/auth/util';
import { TuiNotification } from '@taiga-ui/core';
import { RxState } from '@rx-angular/state';

//TODO: config validator
// const requireEmailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
//     const email = control.get('email');
//     return email != null && email.value.lenght != 0 ? {requireEmail: true} : null;
//   };

export function passwordRequiredValidator(field: AbstractControl): Validators | null {
  return field.value === ''
    ? {
      other: 'Password is required'
    }
    : null;
}
export function emailRequiredValidator(field: AbstractControl): Validators | null {
  return field.value === ''
    ? {
      other: 'Email address is required'
    }
    : null;
}

@Component({
  selector: 'adc-frontend-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    RxState,
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Input value is required!',
        email: 'Please enter a valid email address'
      }
    }
  ]
})
export class SharedLoginComponent implements OnInit {
  tuiEmailType = TuiInputType.Email;
  loginForm!: FormGroup;

  whileLoggingIn$ = this.state.select('whileLoggingIn');

  private loginDispatchHandler$ = this.actions.pipe(ofActionDispatched(Login));
  private loginSuccessHandler$ = this.actions.pipe(ofActionSuccessful(Login));
  private loginErrorHandler$ = this.actions.pipe(ofActionErrored(Login));

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store,
    private actions: Actions,
    private state: RxState<{ whileLoggingIn: boolean }>
  ) {
    this.state.hold(this.loginDispatchHandler$, this.handleDispatch.bind(this));
    this.state.hold(this.loginSuccessHandler$, this.handleSuccess.bind(this));
    this.state.hold(this.loginErrorHandler$, this.handleError.bind(this));
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['minhhuy499@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required],
      remember: [false]
    });
  }
  //TODO: Validator chay bằng Angular
  // get formControls() { return this.loginForm.controls; }

  login() {
    if (this.loginForm.invalid) return;

    const payload: Login['payload'] = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.store.dispatch(new Login(payload));
  }

  private handleDispatch() {
    this.state.set({ whileLoggingIn: true });
  }

  private handleError() {
    this.state.set({ whileLoggingIn: false });
    const error = this.store.selectSnapshot(LoginState.error);
    console.warn(error);
  }
  private handleSuccess() {
    this.state.set({ whileLoggingIn: false });
    this.store.dispatch(
      new ShowNotification({
        message: 'Have a good time',
        options: { label: "You're logged in", status: TuiNotification.Success }
      })
    );
    this.router.navigateByUrl('/');
  }
}
