import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { LogoutState } from './store/logout.state';

@NgModule({
  imports: [NgxsModule.forFeature([LogoutState])]
})
export class DataAccessModule {}
