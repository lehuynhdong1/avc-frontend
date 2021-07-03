import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { NavbarModule } from '../navbar/navbar.module';
import { LanguageModule } from '@shared/language';
import { TuiAccordionModule } from '@taiga-ui/kit';

import { TuiScrollbarModule, TuiButtonModule } from '@taiga-ui/core';
import { RouterModule } from '@angular/router';
import { SidebarModule } from '../sidebar/sidebar.module';

const tuiModules = [TuiButtonModule, TuiScrollbarModule, TuiAccordionModule];

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, NavbarModule, SidebarModule, LanguageModule, RouterModule, tuiModules],
  exports: [LayoutComponent]
})
export class LayoutModule {}
