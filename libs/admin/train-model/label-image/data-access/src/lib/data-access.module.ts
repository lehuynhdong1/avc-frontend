import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { LabelImageState } from './store/label-image.state';

@NgModule({
  imports: [NgxsModule.forFeature([LabelImageState])]
})
export class DataAccessModule {}
