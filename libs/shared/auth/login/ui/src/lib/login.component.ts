import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Store, Actions, ofActionSuccessful, ofActionErrored } from '@ngxs/store';
import { Login, LoginState } from '@shared/auth/login/data-access';
import { TuiDestroyService } from '@taiga-ui/cdk';
import { takeUntil } from 'rxjs/operators';
import { LoginSuccess, LoginError } from '../../../data-access/src/lib/store/login.actions';

//TODO: config validator
// const requireEmailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
//     const email = control.get('email');
//     return email != null && email.value.lenght != 0 ? {requireEmail: true} : null;
//   };

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
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store,
    private actions: Actions,
    private destroy$: TuiDestroyService
  ) {}
  isSubmitted = false;
  loginForm!: FormGroup;

  // readonly loginForm = new FormGroup({
  //   email: new FormControl('', [Validators.required,Validators.email]),
  //   password: new FormControl('', Validators.required),
  //   remember: new FormControl(false)
  // });

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      remember: new FormControl(false)
    });
    this.registerLogin();
  }
  //TODO: Validator chay bằng Angular
  // get formControls() { return this.loginForm.controls; }

  login() {
    this.isSubmitted = true;
    if (this.loginForm.invalid) return;

    const payload: Login['payload'] = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.store.dispatch(new Login(payload));
  }

  private registerLogin() {
    this.actions
      .pipe<Login>(ofActionSuccessful(LoginSuccess))
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        console.log('Login successfully');
        this.router.navigateByUrl('/');
      });

    this.actions
      .pipe<Login>(ofActionSuccessful(LoginError))
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        const error = this.store.selectSnapshot(LoginState.error);
        console.warn('Login failed with error: ', error);
      });
  }
}
