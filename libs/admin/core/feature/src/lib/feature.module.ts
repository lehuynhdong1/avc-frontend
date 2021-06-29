import { routes } from './root.routes';
import { LanguageModuleWithConfig } from '@shared/language';
import { StateManagementModulesWithConfig } from '@shared/state-management';
import { ApiModule } from '@shared/api';
import { LayoutModule } from '@admin/core/ui';
import { UtilModule as AuthUtilModule } from '@shared/auth/util';
import { AppConfig } from '@shared/app-config';
import { RouterModule } from '@angular/router';
import { UtilModule as SharedUtilModule } from '@shared/util';

export function CoreModulesWithConfig(config: AppConfig) {
  return [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top'
    }),
    StateManagementModulesWithConfig(config),
    LanguageModuleWithConfig({ prodMode: config.production }),
    SharedUtilModule,
    ApiModule.forRoot(config),
    LayoutModule,
    AuthUtilModule
  ];
}
