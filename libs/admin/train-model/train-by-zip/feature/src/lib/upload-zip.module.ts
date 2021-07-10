import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UploadZipPage } from '@admin/train-model/train-by-zip/ui';
import { DataAccessModule } from '@admin/train-model/train-by-zip/data-access';

@NgModule({
  imports: [
    DataAccessModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: UploadZipPage, data: { title: 'Upload ZIP' } }
    ])
  ]
})
export class UploadZipModule {}
