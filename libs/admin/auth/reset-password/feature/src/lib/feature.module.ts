import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UiModule, ResetPasswordComponent } from '@admin/auth/reset-password/ui';

@NgModule({
  imports: [
    CommonModule,
    UiModule,
    RouterModule.forChild([
      { path: '', component: ResetPasswordComponent, data: { title: 'Reset Password' } }
    ])
  ]
})
export class FeatureModule {}
