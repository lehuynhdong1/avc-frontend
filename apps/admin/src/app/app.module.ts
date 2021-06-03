import { LayoutModule } from '@admin/core/ui';
import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LanguageModule } from '@shared/language';
import { StateManagementModule } from '@shared/state-management';
import { environment } from '../environments/environment';
import { TuiRootModule } from '@taiga-ui/core';
import { FeatureModule as CoreModule } from '@admin/core/feature';
import { ApiModule, Configuration } from '@shared/api';
import { Store } from '@ngxs/store';
import { AutoTitleService } from '@shared/util';
import { LoginState } from '@shared/auth/login/data-access';

const apiProvider: Provider = {
  provide: Configuration,
  useFactory: (store: Store) => {
    const token = store.selectSnapshot(LoginState.token);
    const appendixHeader = token ? { Authorization: `Bearer ${token}` } : undefined;
    return new Configuration({
      basePath: environment.apiUrl,
      apiKeys: appendixHeader
    });
  },
  deps: [Store],
  multi: false
};
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TuiRootModule,
    CoreModule,
    StateManagementModule.forRoot(environment),
    ApiModule,
    LanguageModule.forRoot({ prodMode: environment.production }),
    LayoutModule
  ],
  bootstrap: [AppComponent],
  providers: [apiProvider, AutoTitleService]
})
export class AppModule {}
