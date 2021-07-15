import { NgxsModule } from '@ngxs/store';
import { NgModule } from '@angular/core';
import { TrainHistoryState } from './store/state';
import { ModelService } from '@shared/api';

@NgModule({
  imports: [NgxsModule.forFeature([TrainHistoryState])],
  providers: [ModelService]
})
export class DataAccessModule {}
