import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { TuiThemeNightModule, TuiModeModule } from '@taiga-ui/core';
import { TuiRootModule } from '@taiga-ui/core';
import { CoreModulesWithConfig } from '@admin/core/feature';
import { environment } from '../environments/environment';

const tuiModules = [TuiRootModule, TuiThemeNightModule, TuiModeModule];
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ...tuiModules,
    CoreModulesWithConfig(environment)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
