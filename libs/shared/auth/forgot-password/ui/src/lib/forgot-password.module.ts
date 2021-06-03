import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedForgotPasswordComponent } from './forgot-password.component';

@NgModule({
  declarations: [SharedForgotPasswordComponent],
  imports: [CommonModule],
  exports: [SharedForgotPasswordComponent]
})
export class SharedForgotPasswordModule {}
