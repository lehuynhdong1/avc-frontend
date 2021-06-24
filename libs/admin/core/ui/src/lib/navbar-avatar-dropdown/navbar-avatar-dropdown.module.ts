import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarAvatarDropdownComponent } from './navbar-avatar-dropdown.component';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiHostedDropdownModule,
} from '@taiga-ui/core';
import { ConfirmDialogModule } from '../confirm-dialog/confirm-dialog.module';
import { CONFIRM_DIALOG_PROVIDER } from '../confirm-dialog/confirm-dialog.provider';
import { AvatarModule } from '@shared/ui/avatar';

const tuiModules = [
  TuiHostedDropdownModule,
  TuiDataListModule,
  TuiButtonModule,
  TuiDialogModule
];

@NgModule({
  declarations: [NavbarAvatarDropdownComponent],
  imports: [CommonModule, ConfirmDialogModule, AvatarModule, ...tuiModules],
  exports: [NavbarAvatarDropdownComponent],
  providers: [CONFIRM_DIALOG_PROVIDER]
})
export class NavbarAvatarDropdownModule {}
