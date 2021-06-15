import { routes } from './root.routes';
import { LanguageModuleWithConfig } from '@shared/language';
import { StateManagementModulesWithConfig } from '@shared/state-management';
import { ApiModule } from '@shared/api';
import { LayoutModule } from '@admin/core/ui';
import { UtilModule as AuthUtilModule } from '@shared/auth/util';
import { AppConfig } from '@shared/app-config';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { RouterModule } from '@angular/router';

export function CoreModulesWithConfig(config: AppConfig) {
  return [
    ApiModule.forRoot(config),
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top'
    }),
    AngularSvgIconModule.forRoot(),
    LayoutModule,
    AuthUtilModule,
    StateManagementModulesWithConfig(config),
    LanguageModuleWithConfig({ prodMode: config.production })
  ];
}
