import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TUI_INPUT_PASSWORD_DEFAULT_OPTIONS, TUI_INPUT_PASSWORD_OPTIONS } from '@taiga-ui/kit';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  ValidatorFn,
  AbstractControl,
  ValidationErrors
} from '@angular/forms';
import { TuiNotification } from '@taiga-ui/core';

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const passwordConfrm = control.get('passwordConfrm');

  return password?.value === passwordConfrm?.value
    ? null
    : passwordConfrm?.value === ''
    ? null
    : { other: 'Password must match' };
};
export function passwordRequiredValidator(field: AbstractControl): Validators | null {
  return field.value === ''
    ? {
        other: 'Password is required'
      }
    : null;
}
export function passwordConfrmRequiredValidator(field: AbstractControl): Validators | null {
  return field.value === ''
    ? {
        other: 'Password confirmation is required'
      }
    : null;
}
export function verificationCodeRequiredValidator(field: AbstractControl): Validators | null {
  return field.value === ''
    ? {
        other: 'Verification code is required'
      }
    : null;
}

@Component({
  selector: 'adc-frontend-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
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
    }
  ]
})
export class SharedResetPasswordComponent implements OnInit {
  private TUI_NOTIFICATION_SUCCESS = TuiNotification.Success;
  private TUI_NOTIFICATION_ERROR = TuiNotification.Error;
  private TUI_NOTIFICATION_INFOR = TuiNotification.Info;
  private SUCCESS_MESSAGE = 'Your password has been reset.';
  private ERROR_MESSAGE = 'Something went wrong. Try again later!';
  private INFOR_MESSAGE = 'Create a new password for your account';

  constructor(private formBuilder: FormBuilder, private router: Router) {}
  status = this.TUI_NOTIFICATION_INFOR;
  isSubmitted = false;
  isReset = false;
  message = this.INFOR_MESSAGE;
  resetPwdForm!: FormGroup;
  passwordConfrm!: FormControl;
  ngOnInit() {
    this.resetPwdForm = this.formBuilder.group(
      {
        verificationCode: new FormControl('', verificationCodeRequiredValidator ),
        password: new FormControl('', passwordRequiredValidator),
        passwordConfrm: new FormControl('', passwordConfrmRequiredValidator)
      },
      { validators: passwordMatchValidator }
    );
  }

  reset() {
    console.log(this.resetPwdForm.value);
    this.isSubmitted = true;
    if (this.resetPwdForm.invalid) {
      return;
    }
    this.isReset = true; //Apply logic check here
    if (this.isReset) {
      this.status = this.TUI_NOTIFICATION_SUCCESS;
      this.message = this.SUCCESS_MESSAGE;
    }else{
      this.status = this.TUI_NOTIFICATION_ERROR;
      this.message = this.ERROR_MESSAGE;
    }

    //TODO: Add Service
    // this.authService.reset(this.resetPwdFrom.value);
  }
}
