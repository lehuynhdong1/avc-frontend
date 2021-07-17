import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { LanguageModule } from '@shared/language';
import { UtilModule as ShareUtilModule } from '@shared/util';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDropdownModule,
  TuiSvgModule
} from '@taiga-ui/core';
import { RouterModule } from '@angular/router';
import { NavbarAvatarDropdownModule } from '../navbar-avatar-dropdown/navbar-avatar-dropdown.module';
import { TuiAvatarModule, TuiBadgeModule, TuiDataListWrapperModule } from '@taiga-ui/kit';

const tuiModules = [
  TuiButtonModule,
  TuiSvgModule,
  TuiDropdownModule,
  TuiDataListModule,
  TuiDataListWrapperModule,
  TuiAvatarModule,
  TuiBadgeModule
];

@NgModule({
  declarations: [NavbarComponent],
  imports: [
    CommonModule,
    LanguageModule,
    RouterModule,
    NavbarAvatarDropdownModule,
    ShareUtilModule,
    tuiModules
  ],
  exports: [NavbarComponent]
})
export class NavbarModule {}
