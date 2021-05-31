import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { AppConfig } from '@shared/app-config';

@NgModule({ imports: [NgxsStoragePluginModule.forRoot()] })
export class StateManagementModule {
  static getImports(config: AppConfig) {
    return [
      StateManagementModule,
      NgxsModule.forRoot([], { developmentMode: !config.production }),
      NgxsLoggerPluginModule.forRoot({ disabled: config.production }),
      NgxsReduxDevtoolsPluginModule.forRoot({ disabled: config.production }),
    ];
  }
}
