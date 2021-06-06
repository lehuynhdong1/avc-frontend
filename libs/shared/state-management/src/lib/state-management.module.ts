import { NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppConfig } from '@shared/app-config';
import {
  LoginState,
  DataAccessModule as LoginDataAccessModule
} from '@shared/auth/login/data-access';
import { DataAccessModule as LogoutDataAccessModule } from '@shared/auth/logout/data-access';

const featureStates = [LoginDataAccessModule, LogoutDataAccessModule];

@NgModule({})
export class StateManagementModule {
  static getImports(config: AppConfig) {
    return [
      StateManagementModule,
      NgxsModule.forRoot([], { developmentMode: !config.production }),
      NgxsStoragePluginModule.forRoot({ key: [LoginState] }),
      NgxsLoggerPluginModule.forRoot({ disabled: config.production }),
      NgxsReduxDevtoolsPluginModule.forRoot({ disabled: config.production }),
      ...featureStates
    ];
  }
}
