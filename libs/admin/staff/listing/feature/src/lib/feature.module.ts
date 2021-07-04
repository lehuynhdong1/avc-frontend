import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataAccessModule } from '@shared/features/staff/data-access';
import { ListingPage, UiModule } from '@admin/staff/listing/ui';
import { CollapseSidebarResolver } from '@admin/core/ui';

@NgModule({
  imports: [
    UiModule,
    DataAccessModule,
    RouterModule.forChild([
      {
        path: '',
        data: { title: 'Staffs' },
        component: ListingPage,
        children: [
          {
            path: 'create',
            loadChildren: () => import('@admin/staff/create/feature').then((m) => m.FeatureModule),
            resolve: [CollapseSidebarResolver]
          },
          {
            path: 'update/:id',
            loadChildren: () => import('@admin/staff/update/feature').then((m) => m.FeatureModule),
            resolve: [CollapseSidebarResolver]
          },
          {
            path: ':id',
            loadChildren: () => import('@admin/staff/detail/feature').then((m) => m.FeatureModule),
            resolve: [CollapseSidebarResolver]
          }
        ]
      }
    ])
  ]
})
export class FeatureModule {}
