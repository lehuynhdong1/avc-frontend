import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedForgotPasswordModule } from '@shared/auth/forgot-password/ui';
import { ForgotPasswordPage } from './forgot-password.page';

@NgModule({
  declarations: [ForgotPasswordPage],
  imports: [CommonModule, SharedForgotPasswordModule],
  exports: [ForgotPasswordPage]
})
export class ForgotPasswordUiModule {}
