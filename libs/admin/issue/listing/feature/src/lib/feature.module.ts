import { NgModule } from '@angular/core';
import { DataAccessModule } from '@shared/features/issue/data-access';
import { ListingPage, UiModule } from '@admin/issue/listing/ui';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    DataAccessModule,
    UiModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListingPage,
        data: { title: 'Issues History' },
        children: [
          {
            path: ':id',
            loadChildren: () => import('@admin/issue/detail/feature').then((m) => m.FeatureModule)
          }
        ]
      }
    ])
  ]
})
export class FeatureModule {}
