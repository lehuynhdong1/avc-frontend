import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UploadImagePage } from '@admin/train-model/upload-image/ui';
import { DataAccessModule } from '@admin/train-model/upload-image/data-access';
@NgModule({
  imports: [
    DataAccessModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: UploadImagePage, data: { title: 'Upload Image' } }
    ])
  ]
})
export class FeatureModule {}
