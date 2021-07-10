import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { TrainByImagesState } from './store';

@NgModule({
  imports: [NgxsModule.forFeature([TrainByImagesState])]
})
export class DataAccessModule {}
