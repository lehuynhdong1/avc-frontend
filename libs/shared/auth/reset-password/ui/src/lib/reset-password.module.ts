import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedResetPasswordComponent } from './reset-password.component';
import {
  TuiButtonModule,
  TuiSvgModule,
  TuiLinkModule,
  TuiNotificationModule,
} from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiInputPasswordModule, TuiFieldErrorModule, TuiInputModule } from '@taiga-ui/kit';
import { TuiValidatorModule } from '@taiga-ui/cdk';

@NgModule({
  declarations: [SharedResetPasswordComponent],
  imports: [
    CommonModule,
    TuiButtonModule,
    TuiSvgModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputPasswordModule,
    TuiLinkModule,
    TuiValidatorModule,
    TuiFieldErrorModule,
    TuiNotificationModule,
    TuiInputModule,
  ],
  exports: [SharedResetPasswordComponent]
})
export class SharedResetPasswordModule {}
