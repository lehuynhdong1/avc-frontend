import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LanguageModule } from '@shared/language';
import { TuiAccordionModule, TuiTabsModule } from '@taiga-ui/kit';

import { TuiScrollbarModule, TuiSvgModule } from '@taiga-ui/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { BackBarModule } from '../back-bar/back-bar.module';

const tuiModules = [TuiScrollbarModule, TuiAccordionModule, TuiTabsModule, TuiSvgModule];

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, LanguageModule, IonicModule, BackBarModule, RouterModule, tuiModules],
  exports: [LayoutComponent]
})
export class LayoutModule {}
