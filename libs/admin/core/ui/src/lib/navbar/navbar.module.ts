import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { LanguageModule } from '@shared/language';
import { NotificationIconPipeModule } from '@shared/util';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDropdownModule,
  TuiSvgModule
} from '@taiga-ui/core';
import { RouterModule } from '@angular/router';
import { NavbarAvatarDropdownModule } from '../navbar-avatar-dropdown/navbar-avatar-dropdown.module';
import { TuiAvatarModule, TuiBadgeModule, TuiDataListWrapperModule } from '@taiga-ui/kit';
import { TimeagoModule } from 'ngx-timeago';

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
    NotificationIconPipeModule,
    TimeagoModule,
    tuiModules
  ],
  exports: [NavbarComponent]
})
export class NavbarModule {}
