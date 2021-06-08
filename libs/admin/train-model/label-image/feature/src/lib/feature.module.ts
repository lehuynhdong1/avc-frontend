import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LabelImagePage } from '@admin/train-model/label-image/ui';
import { DataAccessModule } from '@admin/train-model/label-image/data-access';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', pathMatch: 'full', component: LabelImagePage }]),
    DataAccessModule
  ]
})
export class FeatureModule {}
