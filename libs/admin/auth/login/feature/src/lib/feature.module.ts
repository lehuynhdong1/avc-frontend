import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginModule, LoginComponent } from '@admin/auth/login/ui';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: LoginComponent, data: { title: 'Login' } }]),
    LoginModule
  ]
})
export class FeatureModule {}
