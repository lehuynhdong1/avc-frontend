import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LabelImagePage } from '@admin/train-model/train-by-images/ui';
import { DataAccessModule } from '@admin/train-model/train-by-images/data-access';

@NgModule({
  imports: [
    DataAccessModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: LabelImagePage, data: { title: 'Label Image' } }
    ])
  ]
})
export class LabelImageModule {}
