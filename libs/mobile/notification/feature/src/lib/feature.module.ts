import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListingPage } from '@mobile/notification/ui';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', pathMatch: 'full', component: ListingPage }])]
})
export class FeatureModule {}
