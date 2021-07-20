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
import { UtilModule as SharedUtilModule } from '@shared/util';
import { UtilModule as AuthUtilModule } from '@shared/auth/util';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { getAppConfigProvider } from '@shared/app-config';
import { TimeagoModule } from 'ngx-timeago';
import { defaultConfig } from '@shared/timeago';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot({ mode: 'ios' }),
    TuiRootModule,
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' }),
    OpenApiModule.forRoot(() => new Configuration({ basePath: environment.apiUrl })),
    SharedUtilModule.forRoot(),
    AuthUtilModule,
    StateManagementModulesWithConfig(environment),
    LanguageModuleWithConfig({ prodMode: environment.production }),
    TimeagoModule.forRoot(defaultConfig)
  ],
  bootstrap: [AppComponent],
  providers: [getAppConfigProvider(environment)]
})
export class AppModule {}
