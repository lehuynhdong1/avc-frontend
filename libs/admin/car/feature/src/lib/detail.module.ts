import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetailPage } from '@admin/car/ui';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DetailPage,
        children: [
          {
            path: 'issues/:id',
            loadChildren: () => import('@admin/issue/detail/feature').then((m) => m.FeatureModule)
          }
        ]
      }
    ])
  ]
})
export class DetailModule {}
