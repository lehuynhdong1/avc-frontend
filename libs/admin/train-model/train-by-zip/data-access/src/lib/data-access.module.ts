import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { TrainByZipState } from './store';
import { ModelService } from '@shared/api';

@NgModule({
  imports: [NgxsModule.forFeature([TrainByZipState])],
  providers: [ModelService]
})
export class DataAccessModule {}
