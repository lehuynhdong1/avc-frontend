import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataAccessModule } from '@shared/features/car/data-access';
import { ListingPage, UiModule } from '@admin/car/listing/ui';

@NgModule({
  imports: [
    UiModule,
    DataAccessModule,
    RouterModule.forChild([
      {
        path: '',
        data: { title: 'Cars' },
        component: ListingPage,
        children: [
          {
            path: ':id',
            loadChildren: () => import('@admin/car/detail/feature').then((m) => m.FeatureModule)
          },
          {
            path: 'update/:id',
            loadChildren: () => import('@admin/car/update/feature').then((m) => m.FeatureModule)
          }
        ]
      }
    ])
  ]
})
export class FeatureModule {}
