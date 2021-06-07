import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarAvatarDropdownComponent } from './navbar-avatar-dropdown.component';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiHostedDropdownModule,
  TuiSvgModule
} from '@taiga-ui/core';
import { TuiAvatarModule } from '@taiga-ui/kit';
import { ConfirmDialogModule } from '../confirm-dialog/confirm-dialog.module';
import { CONFIRM_DIALOG_PROVIDER } from '../confirm-dialog/confirm-dialog.provider';
import { AngularSvgIconModule } from 'angular-svg-icon';

const tuiModules = [
  TuiAvatarModule,
  TuiHostedDropdownModule,
  TuiDataListModule,
  TuiSvgModule,
  TuiButtonModule,
  TuiDialogModule
];

@NgModule({
  declarations: [NavbarAvatarDropdownComponent],
  imports: [CommonModule, ConfirmDialogModule, AngularSvgIconModule, ...tuiModules],
  exports: [NavbarAvatarDropdownComponent],
  providers: [CONFIRM_DIALOG_PROVIDER]
})
export class NavbarAvatarDropdownModule {}
