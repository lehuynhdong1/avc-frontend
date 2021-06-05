import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';

import { LoginState } from './store/login.state';

@NgModule({ imports: [NgxsModule.forFeature([LoginState])] })
export class DataAccessModule {}
