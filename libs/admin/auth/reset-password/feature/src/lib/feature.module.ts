import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UiModule, ResetPasswordPage } from '@admin/auth/reset-password/ui';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    RouterModule.forChild([
      { path: '', component: ResetPasswordPage, data: { title: 'Reset Password' } }
    ])
  ]
})
export class FeatureModule {}
