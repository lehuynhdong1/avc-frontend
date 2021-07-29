import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiModule, DetailPage } from '@admin/staff/detail/ui';
import { DataAccessModule } from '@shared/features/staff/data-access';

@NgModule({
  imports: [
    UiModule,
    DataAccessModule,
    RouterModule.forChild([
      {
        path: '',
        component: DetailPage,
        children: [
          {
            path: 'cars/:id',
            loadChildren: () => import('@admin/car/feature').then((m) => m.DetailModule)
          }
        ]
      }
    ])
  ]
})
export class FeatureModule {}
