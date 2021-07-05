import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ProfileService } from '@shared/api';
import { ManageProfileState } from './store';

@NgModule({
  imports: [NgxsModule.forFeature([ManageProfileState])],
  providers: [ProfileService]
})
export class DataAccessModule {}
