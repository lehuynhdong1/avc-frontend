import { NgModule } from '@angular/core';
import { DataAccessModule } from '@shared/features/issue/data-access';
import { ListingPage, UiModule } from '@admin/issue/listing/ui';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    DataAccessModule,
    UiModule,
    RouterModule.forChild([{ path: '', pathMatch: 'full', component: ListingPage }])
  ]
})
export class FeatureModule {}
