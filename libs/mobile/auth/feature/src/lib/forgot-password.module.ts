import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ForgotPasswordUiModule, ForgotPasswordPage } from '@mobile/auth/ui';
import { DataAccessModule } from '@shared/auth/forgot-password/data-access';

@NgModule({
  imports: [
    DataAccessModule,
    ForgotPasswordUiModule,

    RouterModule.forChild([
      { path: '', component: ForgotPasswordPage, data: { title: 'Forgot Password' } }
    ])
  ]
})
export class ForgotPasswordModule {}
