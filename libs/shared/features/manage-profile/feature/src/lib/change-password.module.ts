import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataAccessModule } from '@shared/features/manage-profile/data-access';
import { ChangePasswordPage, ChangePasswordUiModule } from '@shared/features/manage-profile/ui';

@NgModule({
  imports: [
    DataAccessModule,
    ChangePasswordUiModule,
    RouterModule.forChild([{ path: '', pathMatch: 'full', component: ChangePasswordPage }])
  ]
})
export class ChangePasswordModule {}
