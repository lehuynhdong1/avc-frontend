import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataAccessModule } from '@shared/manage-profile/view-profile/data-access';
import { ChangePasswordPage, UiModule } from '@shared/manage-profile/change-password/ui';

@NgModule({
  imports: [
    DataAccessModule,
    UiModule,
    RouterModule.forChild([{ path: '', pathMatch: 'full', component: ChangePasswordPage }])
  ]
})
export class FeatureModule {}
