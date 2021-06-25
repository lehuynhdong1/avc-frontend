import { NgModule } from '@angular/core';
import { CarState } from './store/state';
import { NgxsModule } from '@ngxs/store';
import { AccountsService } from '@shared/api';

@NgModule({
  imports: [NgxsModule.forFeature([CarState])],
  providers: [AccountsService]
})
export class DataAccessModule {}
