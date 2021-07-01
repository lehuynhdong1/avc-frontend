import { NgModule } from '@angular/core';
import { IssueState } from './store/state';
import { NgxsModule } from '@ngxs/store';
import { IssueService } from '@shared/api';

@NgModule({
  imports: [NgxsModule.forFeature([IssueState])],
  providers: [IssueService]
})
export class DataAccessModule {}
