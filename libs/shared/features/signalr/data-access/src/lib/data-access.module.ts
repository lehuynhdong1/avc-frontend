import { NgModule } from '@angular/core';
import { SignalRState } from './store/state';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  imports: [NgxsModule.forFeature([SignalRState])]
})
export class DataAccessModule {}
