import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { TrainByZipState } from './store';

@NgModule({
  imports: [NgxsModule.forFeature([TrainByZipState])]
})
export class DataAccessModule {}
