import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { AccountsService } from './api/accounts.service';
import { AuthenticationService } from './api/authentication.service';
import { CarsService } from './api/cars.service';
import { CheckService } from './api/check.service';
import { IssueService } from './api/issue.service';
import { IssueTypesService } from './api/issue-types.service';
import { ModelService } from './api/model.service';
import { ProfileService } from './api/profile.service';
import { RolesService } from './api/roles.service';
import { UserNotificationsService } from './api/user-notifications.service';

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: []
})
export class OpenApiModule {
  public static forRoot(
    configurationFactory: () => Configuration
  ): ModuleWithProviders<OpenApiModule> {
    return {
      ngModule: OpenApiModule,
      providers: [{ provide: Configuration, useFactory: configurationFactory }]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: OpenApiModule, @Optional() http: HttpClient) {
    if (parentModule) {
      throw new Error('OpenApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error(
        'You need to import the HttpClientModule in your AppModule! \n' +
          'See also https://github.com/angular/angular/issues/20575'
      );
    }
  }
}
