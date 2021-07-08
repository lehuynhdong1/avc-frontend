import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ViewProfilePage, ViewProfileUiModule } from '@admin/manage-profile/ui';
import { DataAccessModule } from '@shared/features/manage-profile/data-access';

@NgModule({
  imports: [
    ViewProfileUiModule,
    DataAccessModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ViewProfilePage, data: { title: 'My Profile' } }
    ])
  ]
})
export class ViewProfileModule {}
