import { NgModule } from '@angular/core';
import { StaffState } from './store/state';
import { NgxsModule } from '@ngxs/store';
import { AccountsService } from '@shared/api';

@NgModule({
  imports: [NgxsModule.forFeature([StaffState])],
  providers: [AccountsService]
})
export class DataAccessModule {}
