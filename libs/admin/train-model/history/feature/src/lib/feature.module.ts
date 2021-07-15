import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataAccessModule } from '@admin/train-model/history/data-access';
import { ListingPage, DetailPage } from '@admin/train-model/history/ui';

@NgModule({
  imports: [
    DataAccessModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ListingPage },
      { path: ':id', pathMatch: 'full', component: DetailPage }
    ])
  ]
})
export class FeatureModule {}
