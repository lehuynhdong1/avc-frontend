import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedForgotPasswordComponent } from './forgot-password.component';
import {
  TuiButtonModule,
  TuiSvgModule,
  TuiLinkModule,
  TuiNotificationModule
} from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule, TuiFieldErrorModule } from '@taiga-ui/kit';
import { TuiValidatorModule } from '@taiga-ui/cdk';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [SharedForgotPasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TuiButtonModule,
    TuiSvgModule,
    TuiInputModule,
    TuiLinkModule,
    TuiValidatorModule,
    TuiFieldErrorModule,
    TuiNotificationModule
  ],
  exports: [SharedForgotPasswordComponent]
})
export class SharedForgotPasswordModule {}
