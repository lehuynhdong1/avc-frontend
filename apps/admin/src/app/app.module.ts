import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { TuiThemeNightModule, TuiModeModule } from '@taiga-ui/core';
import { TuiRootModule } from '@taiga-ui/core';
import { FeatureModule as CoreModule } from '@admin/core/feature';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { AutoTitleService } from '@shared/util';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    TuiRootModule,
    TuiThemeNightModule,
    TuiModeModule,
    CoreModule.getImports(environment)
  ],
  bootstrap: [AppComponent],
  providers: [AutoTitleService]
})
export class AppModule {}
