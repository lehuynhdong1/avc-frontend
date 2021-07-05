import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiModule, ForgotPasswordPage } from '@admin/auth/forgot-password/ui';
import { DataAccessModule } from '@shared/auth/forgot-password/data-access';
import { UtilModule } from '@shared/util';

@NgModule({
  imports: [
    UiModule,
    UtilModule,
    DataAccessModule,
    RouterModule.forChild([
      { path: '', component: ForgotPasswordPage, data: { title: 'Forgot Password' } }
    ])
  ]
})
export class FeatureModule {}
