import { SharedLoginModule } from '@shared/auth/login/ui';
//TODO: Reset module import error
// import { ForgotPasswordModule } from '';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';

@NgModule({
  declarations: [LoginComponent],
  imports: [CommonModule, SharedLoginModule]
})
export class LoginModule {}
