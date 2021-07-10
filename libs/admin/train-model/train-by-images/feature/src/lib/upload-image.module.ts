import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UploadImagePage } from '@admin/train-model/train-by-images/ui';
import { DataAccessModule } from '@admin/train-model/train-by-images/data-access';
@NgModule({
  imports: [
    DataAccessModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: UploadImagePage, data: { title: 'Upload Image' } }
    ])
  ]
})
export class UploadImageModule {}
