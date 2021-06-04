import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TuiNotification } from '@taiga-ui/core';
@Component({
  selector: 'adc-frontend-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Email address is required!',
        email: 'Please enter a valid email address'
      }
    }
  ]
})
export class SharedForgotPasswordComponent implements OnInit {
  private TUI_NOTIFICATION_SUCCESS = TuiNotification.Success;
  private TUI_NOTIFICATION_ERROR = TuiNotification.Error;
  private TUI_NOTIFICATION_INFOR = TuiNotification.Info;

  private SUCCESS_MESSAGE = "Password reset sent! You'll receive an email. Plesase check your email notification!";
  private ERROR_MESSAGE = "Password reset would not be sent! You are not registered on our system!";
  private INFOR_MESSAGE = "Fill the form to reset your password";

  constructor(private formBuilder: FormBuilder, private router: Router) {}
  status = this.TUI_NOTIFICATION_INFOR;
  isSubmitted = false;
  isSend = false;
  message = this.INFOR_MESSAGE;
  forgotPwdForm!: FormGroup;

  ngOnInit() {
    this.forgotPwdForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  send() {
    console.log(this.forgotPwdForm.value);
    this.isSubmitted = true;
    if (this.forgotPwdForm.invalid) {
      return;
    }

    //TODO: Add Service
    // this.authService.sendMail(this.forgetPwdForm.value);
    this.isSend = true; //Apply logic check here
    if (this.isSend) {
      this.status = this.TUI_NOTIFICATION_SUCCESS;
      this.message = this.SUCCESS_MESSAGE;
    } else {
      this.status = this.TUI_NOTIFICATION_ERROR;
      this.message = this.ERROR_MESSAGE;
    }
    // this.router.navigateByUrl('/login');
  }
}
