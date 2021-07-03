import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UnapprovePage } from '@admin/car/unapproved-listing/ui';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', pathMatch: 'full', component: UnapprovePage }])]
})
export class FeatureModule {}
