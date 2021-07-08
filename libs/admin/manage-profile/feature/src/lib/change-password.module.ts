import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataAccessModule } from '@shared/features/manage-profile/data-access';
import { ChangePasswordPage, ChangePasswordUiModule } from '@admin/manage-profile/ui';

@NgModule({
  imports: [
    DataAccessModule,
    ChangePasswordUiModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: ChangePasswordPage,
        data: { title: 'Change Password' }
      }
    ])
  ]
})
export class ChangePasswordModule {}
