import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { NavbarModule } from '../navbar/navbar.module';
import { LanguageModule } from '@shared/language';

import { TuiButtonModule } from '@taiga-ui/core';

const tuiModules = [TuiButtonModule];

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, NavbarModule, LanguageModule, ...tuiModules],
  exports: [LayoutComponent],
})
export class LayoutModule {}
