import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AuthenticationService } from '@shared/api';
import { ResetPasswordState } from './store';

@NgModule({
  imports: [NgxsModule.forFeature([ResetPasswordState])],
  providers: [AuthenticationService]
})
export class DataAccessModule {}
