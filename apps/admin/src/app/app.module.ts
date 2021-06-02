import { LayoutModule } from '@admin/core/ui';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LanguageModule } from '@shared/language';
import { StateManagementModule } from '@shared/state-management';
import { environment } from '../environments/environment';
import { TuiModule } from './tui.module';
import { FeatureModule as CoreModule } from '@admin/core/feature';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TuiModule,
    CoreModule,
    StateManagementModule.forRoot(environment),
    LanguageModule.forRoot({ prodMode: environment.production }),
    LayoutModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
