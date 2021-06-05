import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UiModule, LoginPage } from '@admin/auth/login/ui';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    RouterModule.forChild([{ path: '', component: LoginPage, data: { title: 'Login' } }])
  ]
})
export class FeatureModule {}
