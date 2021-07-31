// import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
// import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppConfig } from '@shared/app-config';
import {
  LoginState,
  DataAccessModule as LoginDataAccessModule
} from '@shared/auth/login/data-access';
import { DataAccessModule as LogoutDataAccessModule } from '@shared/auth/logout/data-access';
import { DataAccessModule as SignalRDataAccessModule } from '@shared/features/signalr/data-access';
import { DataAccessModule as CarDataAccessModule } from '@shared/features/car/data-access';
import { NgxsResetPluginModule } from 'ngxs-reset-plugin';

const featureStates = [
  LoginDataAccessModule,
  LogoutDataAccessModule,
  SignalRDataAccessModule,
  CarDataAccessModule
];

export function StateManagementModulesWithConfig(config: AppConfig) {
  return [
    NgxsModule.forRoot([], { developmentMode: !config.production }),
    NgxsStoragePluginModule.forRoot({ key: [LoginState] }),
    NgxsResetPluginModule.forRoot(),
    // NgxsLoggerPluginModule.forRoot({ disabled: config.production }),
    // NgxsReduxDevtoolsPluginModule.forRoot({ disabled: config.production }),
    ...featureStates
  ];
}
