import { LayoutModule } from '@admin/core/ui';
import { NgModule } from '@angular/core';
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
  providers: [
    {
      provide: Configuration,
      useFactory: (store: Store) => {
        return new Configuration({
          basePath: environment.apiUrl,
          // #TODO: If apiKey has been already in Store => apiKeys, else return undefined
          apiKeys: {
            Authorization: 'Bearer ' + 'Select from Store to get token here'
          }
        });
      },
      deps: [Store],
      multi: false
    }
  ]
})
export class AppModule {}
