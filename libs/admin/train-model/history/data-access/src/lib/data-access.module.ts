import { NgxsModule } from '@ngxs/store';
import { NgModule } from '@angular/core';
import { TrainHistoryState } from './store/state';
import { ModelService } from '@shared/api';
import { GitlabApiService } from '@shared/util';

@NgModule({
  imports: [NgxsModule.forFeature([TrainHistoryState])],
  providers: [ModelService, GitlabApiService]
})
export class DataAccessModule {}
