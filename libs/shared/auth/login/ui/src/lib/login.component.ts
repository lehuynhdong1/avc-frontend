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
import { TuiDestroyService, TuiInputType } from '@taiga-ui/cdk';
import { takeUntil } from 'rxjs/operators';
import { LoginSuccess, LoginError } from '../../../data-access/src/lib/store/login.actions';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ShowNotification } from '../../../../util/src/lib/store/util.actions';
import { TuiNotification } from '@taiga-ui/core';
import { BehaviorSubject, of } from 'rxjs';

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
    TuiDestroyService,
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
  whileLoggingIn$ = new BehaviorSubject(false);

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store,
    private actions: Actions,
    private destroy$: TuiDestroyService
  ) {}
  loginForm!: FormGroup;

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['minhhuy499@gmail.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required],
      remember: [false]
    });
    this.registerLogin();
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

  private registerLogin() {
    this.actions
      .pipe(ofActionDispatched(Login))
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.whileLoggingIn$.next(true);
      });

    this.actions
      .pipe(ofActionSuccessful(Login))
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.whileLoggingIn$.next(false);
      });

    this.actions
      .pipe<LoginSuccess>(ofActionSuccessful(LoginSuccess))
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.store.dispatch(
          new ShowNotification({
            message: 'Have a good time',
            options: { label: "You're logged in", status: TuiNotification.Success }
          })
        );
        this.router.navigateByUrl('/');
      });

    this.actions
      .pipe<LoginError>(ofActionSuccessful(LoginError))
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const error = this.store.selectSnapshot(LoginState.error);
        console.warn('Login failed with error: ', error);
      });
  }
}
