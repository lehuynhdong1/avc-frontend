import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListingComponent } from '@mobile/notification/ui';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', pathMatch: 'full', component: ListingComponent }])]
})
export class FeatureModule {}
