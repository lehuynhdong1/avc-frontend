import { SharedLoginModule } from '@shared/auth/login/ui';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginPage } from './login.page';

@NgModule({
  declarations: [LoginPage],
  imports: [CommonModule, SharedLoginModule]
})
export class UiModule {}
