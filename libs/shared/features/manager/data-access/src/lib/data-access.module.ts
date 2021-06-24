import { NgModule } from '@angular/core';
import { ManagerState } from './store/state';
import { NgxsModule } from '@ngxs/store';
import { AccountsService } from '@shared/api';

@NgModule({
  imports: [NgxsModule.forFeature([ManagerState])],
  providers: [AccountsService]
})
export class DataAccessModule {}
