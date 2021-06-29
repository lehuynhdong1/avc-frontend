import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiModule, DetailPage } from '@admin/staff/detail/ui';
import { DataAccessModule } from '@shared/features/staff/data-access';

@NgModule({
  imports: [
    UiModule,
    DataAccessModule,
    RouterModule.forChild([{ path: '', pathMatch: 'full', component: DetailPage }])
  ]
})
export class FeatureModule {}
