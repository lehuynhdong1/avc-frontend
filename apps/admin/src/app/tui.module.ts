import { NgModule } from '@angular/core';
import {
  TuiRootModule,
  TuiScrollbarModule,
  TuiScrollControlsModule,
  TuiExpandModule,
  TuiSvgModule,
  TuiThemeNightModule,
  TuiModeModule,
} from '@taiga-ui/core';
import { TuiAccordionModule } from '@taiga-ui/kit';

const modules = [
  TuiScrollbarModule,
  TuiScrollControlsModule,
  TuiAccordionModule,
  TuiExpandModule,
  TuiSvgModule,
  TuiThemeNightModule,
  TuiModeModule,
];

@NgModule({
  imports: [TuiRootModule],
  exports: modules,
})
export class TuiModule {}
