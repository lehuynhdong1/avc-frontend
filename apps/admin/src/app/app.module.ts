import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LanguageModule } from '@shared/language';
import { StateManagementModule } from '@shared/state-management';
import { environment } from '../environments/environment';
import { TuiModule } from './tui.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    TuiModule,
    StateManagementModule.getImports(environment),
    LanguageModule.getImports({ prodMode: environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
