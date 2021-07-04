import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataAccessModule } from '@shared/features/car/data-access';
import { ListingPage, UiModule } from '@admin/car/listing/ui';
import { CollapseSidebarResolver } from '@admin/core/ui';

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
            path: 'unapproved',
            loadChildren: () =>
              import('@admin/car/unapproved-listing/feature').then((m) => m.FeatureModule),
            resolve: [CollapseSidebarResolver]
          },
          {
            path: 'approve',
            loadChildren: () => import('@admin/car/approve/feature').then((m) => m.FeatureModule),
            resolve: [CollapseSidebarResolver]
          },
          {
            path: ':id',
            loadChildren: () => import('@admin/car/detail/feature').then((m) => m.FeatureModule),
            resolve: [CollapseSidebarResolver]
          },
          {
            path: 'update/:id',
            loadChildren: () => import('@admin/car/update/feature').then((m) => m.FeatureModule),
            resolve: [CollapseSidebarResolver]
          }
        ]
      }
    ])
  ]
})
export class FeatureModule {}
