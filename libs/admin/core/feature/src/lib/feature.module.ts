import { routes } from './root.routes';
import { NgModule } from '@angular/core';
import { LanguageModule } from '@shared/language';
import { StateManagementModule } from '@shared/state-management';
import { ApiModule } from '@shared/api';
import { LayoutModule } from '@admin/core/ui';
import { UtilModule as AuthUtilModule } from '@shared/auth/util';
import { AppConfig } from '@shared/app-config';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouterModule } from '@angular/router';
@NgModule({})
export class FeatureModule {
  static getImports(config: AppConfig) {
    return [
      StateManagementModule.getImports(config),
      ApiModule.forRoot(config),
      LanguageModule.getImports({ prodMode: config.production }),
      RouterModule.forRoot(routes, {
        scrollPositionRestoration: 'top'
      }),
      LayoutModule,
      AuthUtilModule,
      AngularSvgIconModule.forRoot()
    ];
  }
}
