import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  TUI_INPUT_PASSWORD_DEFAULT_OPTIONS,
  TUI_INPUT_PASSWORD_OPTIONS,
  TUI_VALIDATION_ERRORS
} from '@taiga-ui/kit';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';

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
    {
      provide: TUI_INPUT_PASSWORD_OPTIONS,
      useValue: {
        ...TUI_INPUT_PASSWORD_DEFAULT_OPTIONS,
        icons: {
          hide: 'tuiIconEyeClosed',
          show: 'tuiIconEyeOpen'
        }
      }
    },
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
  constructor(private formBuilder: FormBuilder, private router: Router) {}
  isSubmitted = false;
  loginForm!: FormGroup;

  // readonly loginForm = new FormGroup({
  //   email: new FormControl('', [Validators.required,Validators.email]),
  //   password: new FormControl('', Validators.required),
  //   remember: new FormControl(false)
  // });

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [emailRequiredValidator, Validators.email]),
      password: new FormControl('', passwordRequiredValidator),
      remember: new FormControl(false)
    });
  }
  //TODO: Validator chay bằng Angular
  // get formControls() { return this.loginForm.controls; }

  login() {
    console.log(this.loginForm.value);
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    //TODO: Add Service
    // this.authService.login(this.loginForm.value);
    this.router.navigateByUrl('/');
  }
}
