import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewProfilePage, UiModule } from '@shared/manage-profile/view-profile/ui';
import { DataAccessModule } from '@shared/manage-profile/view-profile/data-access';

@NgModule({
  imports: [
    UiModule,
    DataAccessModule,
    RouterModule.forChild([{ path: '', pathMatch: 'full', component: ViewProfilePage }])
  ]
})
export class FeatureModule {}
