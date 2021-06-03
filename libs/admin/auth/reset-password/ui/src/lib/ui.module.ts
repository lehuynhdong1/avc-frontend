import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password.component';
import { SharedResetPasswordModule } from '@shared/auth/reset-password/ui';

@NgModule({
  declarations: [ResetPasswordComponent],
  imports: [CommonModule, SharedResetPasswordModule],
  exports: [ResetPasswordComponent]
})
export class UiModule {}
