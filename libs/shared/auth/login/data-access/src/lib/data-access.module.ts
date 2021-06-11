import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { AuthenticationService } from '@shared/api';

import { LoginState } from './store/login.state';

@NgModule({ imports: [NgxsModule.forFeature([LoginState])], providers: [AuthenticationService] })
export class DataAccessModule {}
