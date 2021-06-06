import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { LanguageModule } from '@shared/language';

import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiAvatarModule } from '@taiga-ui/kit';
import { RouterModule } from '@angular/router';
import { NavbarAvatarDropdownModule } from '../navbar-avatar-dropdown/navbar-avatar-dropdown.module';

const tuiModules = [TuiButtonModule, TuiAvatarModule, TuiSvgModule];
@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, LanguageModule, RouterModule, NavbarAvatarDropdownModule, ...tuiModules],
  exports: [NavbarComponent]
})
export class NavbarModule {}
