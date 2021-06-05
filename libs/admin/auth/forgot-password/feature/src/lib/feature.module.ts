import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UiModule, ForgotPasswordPage } from '@admin/auth/forgot-password/ui';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    RouterModule.forChild([
      { path: '', component: ForgotPasswordPage, data: { title: 'Forgot Password' } }
    ])
  ]
})
export class FeatureModule {}
