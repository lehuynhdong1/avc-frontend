import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedForgotPasswordModule } from '@shared/auth/forgot-password/ui';
import { ForgotPasswordComponent } from './forgot-password.component';

@NgModule({
  imports: [CommonModule, SharedForgotPasswordModule],
  declarations: [ForgotPasswordComponent],
  exports: [ForgotPasswordComponent]
})
export class UiModule {}
