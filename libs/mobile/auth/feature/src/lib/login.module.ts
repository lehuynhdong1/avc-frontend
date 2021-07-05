import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiModule, LoginPage } from '@admin/auth/login/ui';

@NgModule({
  imports: [
    UiModule,
    RouterModule.forChild([{ path: '', component: LoginPage, data: { title: 'Login' } }])
  ]
})
export class LoginModule {}
