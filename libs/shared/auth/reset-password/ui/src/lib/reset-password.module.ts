import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedResetPasswordComponent } from './reset-password.component';

@NgModule({
  declarations: [SharedResetPasswordComponent],
  imports: [CommonModule],
  exports: [SharedResetPasswordComponent]
})
export class SharedResetPasswordModule {}
