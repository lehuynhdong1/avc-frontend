import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResetPasswordUiModule, ResetPasswordPage } from '@mobile/auth/ui';
import { DataAccessModule } from '@shared/auth/reset-password/data-access';

@NgModule({
  imports: [
    DataAccessModule,
    ResetPasswordUiModule,
    RouterModule.forChild([
      { path: '', component: ResetPasswordPage, data: { title: 'Reset Password' } }
    ])
  ]
})
export class ResetPasswordModule {}
