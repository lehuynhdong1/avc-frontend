import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { TuiRootModule } from '@taiga-ui/core';
import { environment } from '../environments/environment';
import { routes } from './root.routes';
import { LanguageModuleWithConfig } from '@shared/language';
import { StateManagementModulesWithConfig } from '@shared/state-management';
import { Configuration, OpenApiModule } from '@shared/api';
import { LayoutModule } from '@admin/core/ui';
import { UtilModule as SharedUtilModule } from '@shared/util';
import { UtilModule as AuthUtilModule } from '@shared/auth/util';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { getAppConfigProvider } from '@shared/app-config';
import { TimeagoModule } from 'ngx-timeago';
import { defaultConfig } from '@shared/timeago';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    TuiRootModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' }),
    OpenApiModule.forRoot(() => new Configuration({ basePath: environment.apiUrl })),
    LayoutModule,
    SharedUtilModule.forRoot(),
    AuthUtilModule,
    StateManagementModulesWithConfig(environment),
    LanguageModuleWithConfig({ prodMode: environment.production }),
    NgxChartsModule,
    TimeagoModule.forRoot(defaultConfig),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  bootstrap: [AppComponent],
  providers: [getAppConfigProvider(environment)]
})
export class AppModule {}
