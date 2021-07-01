import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataAccessModule } from '@shared/features/manager/data-access';
import { ListingPage, UiModule } from '@admin/manager/listing/ui';

@NgModule({
  imports: [
    UiModule,
    DataAccessModule,
    RouterModule.forChild([
      {
        path: '',
        data: { title: 'Managers' },
        component: ListingPage,
        children: [
          {
            path: 'create',
            loadChildren: () => import('@admin/manager/create/feature').then((m) => m.FeatureModule)
          },
          {
            path: 'update/:id',
            loadChildren: () => import('@admin/manager/update/feature').then((m) => m.FeatureModule)
          },
          {
            path: ':id',
            loadChildren: () => import('@admin/manager/detail/feature').then((m) => m.FeatureModule)
          }
        ]
      }
    ])
  ]
})
export class FeatureModule {}
