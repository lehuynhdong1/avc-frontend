import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { DashBoardService } from '@shared/api';
import { DashboardState } from './store/state';

@NgModule({
  imports: [NgxsModule.forFeature([DashboardState])],
  providers: [DashBoardService]
})
export class DataAccessModule {}
