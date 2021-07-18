import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginUiModule, LoginPage } from '@mobile/auth/ui';
import { DataAccessModule } from '@shared/auth/login/data-access';

@NgModule({
  imports: [
    DataAccessModule,
    LoginUiModule,
    RouterModule.forChild([{ path: '', component: LoginPage, data: { title: 'Login' } }])
  ]
})
export class LoginModule {}
