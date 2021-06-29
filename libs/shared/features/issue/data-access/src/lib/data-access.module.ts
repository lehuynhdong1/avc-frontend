import { NgModule } from '@angular/core';
import { IssueState } from './store/state';
import { NgxsModule } from '@ngxs/store';
import { AccountsService } from '@shared/api';

@NgModule({
  imports: [NgxsModule.forFeature([IssueState])],
  providers: [AccountsService]
})
export class DataAccessModule {}
