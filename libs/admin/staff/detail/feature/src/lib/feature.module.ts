import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DetailPage } from '@admin/staff/detail/ui';

@NgModule({
  imports: [RouterModule.forChild([{ path: '', pathMatch: 'full', component: DetailPage }])]
})
export class FeatureModule {}
