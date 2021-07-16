import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { TrainByImagesState } from './store';
import { ModelService } from '@shared/api';

@NgModule({
  imports: [NgxsModule.forFeature([TrainByImagesState])],
  providers: [ModelService]
})
export class DataAccessModule {}
