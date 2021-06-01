import { NgModule } from '@angular/core';
import {
  TuiRootModule,
  TuiScrollbarModule,
  TuiScrollControlsModule,
  TuiExpandModule,
  TuiSvgModule,
  TuiThemeNightModule,
  TuiModeModule,
  TuiButtonModule,
} from '@taiga-ui/core';
import { TuiAccordionModule } from '@taiga-ui/kit';

const modules = [
  TuiRootModule,
  TuiScrollbarModule,
  TuiScrollControlsModule,
  TuiAccordionModule,
  TuiExpandModule,
  TuiSvgModule,
  TuiThemeNightModule,
  TuiModeModule,
  TuiButtonModule,
];

@NgModule({ exports: modules })
export class TuiModule {}
