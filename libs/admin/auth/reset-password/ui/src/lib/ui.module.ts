import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordPage } from './reset-password.page';
import { SharedResetPasswordModule } from '@shared/auth/reset-password/ui';

@NgModule({
  declarations: [ResetPasswordPage],
  imports: [CommonModule, SharedResetPasswordModule],
  exports: [ResetPasswordPage]
})
export class UiModule {}
