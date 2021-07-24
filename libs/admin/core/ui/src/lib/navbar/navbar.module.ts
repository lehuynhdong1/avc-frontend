import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar.component';
import { LanguageModule } from '@shared/language';
import { NotificationIconPipeModule } from '@shared/util';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDropdownModule,
  TuiScrollbarModule,
  TuiSvgModule
} from '@taiga-ui/core';
import { RouterModule } from '@angular/router';
import { NavbarAvatarDropdownModule } from '../navbar-avatar-dropdown/navbar-avatar-dropdown.module';
import { TuiBadgeModule, TuiDataListWrapperModule } from '@taiga-ui/kit';
import { TimeagoModule } from 'ngx-timeago';
import { ScrollingModule } from '@angular/cdk/scrolling';

const tuiModules = [
  TuiButtonModule,
  TuiSvgModule,
  TuiDropdownModule,
  TuiDataListModule,
  TuiDataListWrapperModule,
  TuiBadgeModule,
  TuiScrollbarModule
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
    ScrollingModule,
    tuiModules
  ],
  exports: [NavbarComponent]
})
export class NavbarModule {}
