import { SharedLoginModule } from '@shared/auth/login/ui';
import {} from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginPage } from './login.page';

@NgModule({
  declarations: [LoginPage],
  imports: [SharedLoginModule]
})
export class LoginUiModule {}
