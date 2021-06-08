import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { UploadImageState } from './store/upload-image.state';

@NgModule({
  imports: [NgxsModule.forFeature([UploadImageState])]
})
export class DataAccessModule {}
