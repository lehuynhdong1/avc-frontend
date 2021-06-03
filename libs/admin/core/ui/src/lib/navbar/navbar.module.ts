import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { LanguageModule } from '@shared/language';

import { TuiButtonModule } from '@taiga-ui/core';
import { TuiAvatarModule } from '@taiga-ui/kit';
import { RouterModule } from '@angular/router';

const tuiModules = [TuiButtonModule, TuiAvatarModule];
@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, LanguageModule, RouterModule, ...tuiModules],
  exports: [NavbarComponent]
})
export class NavbarModule {}
