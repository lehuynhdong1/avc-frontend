import { RootRoutingModule } from './root-routing.module';
import { NgModule } from '@angular/core';
import { LanguageModule } from '@shared/language';
import { StateManagementModule } from '@shared/state-management';
import { ApiModule } from '@shared/api';
import { LayoutModule } from '@admin/core/ui';
import { UtilModule as AuthUtilModule } from '@shared/auth/util';
import { AppConfig } from '@shared/app-config';

@NgModule({})
export class FeatureModule {
  static getImports(config: AppConfig) {
    return [
      StateManagementModule.getImports(config),
      ApiModule.forRoot(config),
      LanguageModule.getImports({ prodMode: config.production }),
      RootRoutingModule,
      LayoutModule,
      AuthUtilModule
    ];
  }
}
