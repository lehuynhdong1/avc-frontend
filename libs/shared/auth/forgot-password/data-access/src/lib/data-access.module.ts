import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AuthenticationService } from '@shared/api';
import { ForgotPasswordState } from './store';

@NgModule({
  imports: [NgxsModule.forFeature([ForgotPasswordState])],
  providers: [AuthenticationService]
})
export class DataAccessModule {}
