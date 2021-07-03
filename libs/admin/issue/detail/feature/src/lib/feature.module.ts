import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiModule, DetailPage } from '@admin/issue/detail/ui';
import { DataAccessModule } from '@shared/features/issue/data-access';

@NgModule({
  imports: [
    UiModule,
    DataAccessModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: DetailPage, data: { title: 'Issue Detail' } }
    ])
  ]
})
export class FeatureModule {}
