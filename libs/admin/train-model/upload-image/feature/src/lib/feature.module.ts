import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UploadImagePage } from '@admin/train-model/upload-image/ui';
import { DataAccessModule } from '@admin/train-model/upload-image/data-access';
@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', pathMatch: 'full', component: UploadImagePage }]),
    DataAccessModule
  ]
})
export class FeatureModule {}
