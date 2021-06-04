import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { NgxsRootModule } from '@ngxs/store/src/modules/ngxs-root.module';
import { AppConfig } from '@shared/app-config';
import { LoginState } from '../../../auth/login/data-access/src/lib/store/login.state';

@NgModule({ imports: [NgxsStoragePluginModule.forRoot({ key: [LoginState] })] })
export class StateManagementModule {
  static forRoot(
    config: AppConfig
  ): [
    StateManagementModule,
    ModuleWithProviders<NgxsRootModule>,
    ModuleWithProviders<NgxsLoggerPluginModule> | undefined,
    ModuleWithProviders<NgxsReduxDevtoolsPluginModule> | undefined
  ] {
    return [
      StateManagementModule,
      NgxsModule.forRoot([], { developmentMode: !config.production }),
      config.production
        ? undefined
        : NgxsLoggerPluginModule.forRoot({ disabled: config.production }),
      config.production
        ? undefined
        : NgxsReduxDevtoolsPluginModule.forRoot({
            disabled: config.production
          })
    ];
  }
}
