import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { TranslocoModule } from '@ngneat/transloco';
import { RouterModule } from '@angular/router';
import { AvatarModule } from '@shared/ui/avatar';
import { TuiDialogModule, TuiHintModule, TuiHostedDropdownModule } from '@taiga-ui/core';
import { NavbarAvatarDropdownModule } from '../navbar-avatar-dropdown/navbar-avatar-dropdown.module';
import { NotificationIconPipeModule } from '@shared/util';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDropdownModule,
  TuiScrollbarModule,
  TuiSvgModule
} from '@taiga-ui/core';
import { TuiBadgeModule, TuiDataListWrapperModule } from '@taiga-ui/kit';
import { TimeagoModule } from 'ngx-timeago';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ViewProfileModule } from '@admin/manage-profile/feature';

const tuiModules = [
  TuiButtonModule,
  TuiSvgModule,
  TuiHintModule,
  TuiDropdownModule,
  TuiDataListModule,
  TuiDataListWrapperModule,
  TuiBadgeModule,
  TuiScrollbarModule,
  TuiHostedDropdownModule,
  TuiDialogModule
];
@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    TranslocoModule,
    RouterModule,
    AvatarModule,
    tuiModules,
    NavbarAvatarDropdownModule,
    NotificationIconPipeModule,
    ViewProfileModule,
    TimeagoModule,
    ScrollingModule
  ],
  exports: [SidebarComponent]
})
export class SidebarModule {}
