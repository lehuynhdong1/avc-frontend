import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetailPage } from '@admin/manager/detail/ui';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DetailPage,
        children: [
          {
            path: 'cars/:id',
            loadChildren: () => import('@admin/car/feature').then((m) => m.DetailModule)
          },
          {
            path: 'staffs/:id',
            loadChildren: () => import('@admin/staff/detail/feature').then((m) => m.FeatureModule)
          }
        ]
      }
    ])
  ]
})
export class FeatureModule {}
