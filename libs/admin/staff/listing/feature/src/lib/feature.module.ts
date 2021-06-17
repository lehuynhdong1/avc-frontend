import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataAccessModule } from '@shared/features/staff/data-access';
import { ListingPage, UiModule } from '@admin/staff/listing/ui';

@NgModule({
  imports: [
    UiModule,
    RouterModule.forChild([
      {
        path: '',
        data: { title: 'Staffs' },
        component: ListingPage,
        children: [
          {
            path: ':id',
            loadChildren: () => import('@admin/staff/detail/feature').then((m) => m.FeatureModule)
          }
        ]
      }
    ]),
    DataAccessModule
  ]
})
export class FeatureModule {}
