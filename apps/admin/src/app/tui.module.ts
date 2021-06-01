import { NgModule } from '@angular/core';
import {
  TuiRootModule,
  TuiSvgModule,
  TuiThemeNightModule,
  TuiModeModule,
  TuiButtonModule
} from '@taiga-ui/core';

const modules = [TuiRootModule, TuiSvgModule, TuiThemeNightModule, TuiModeModule, TuiButtonModule];

@NgModule({ exports: modules })
export class TuiModule {}
