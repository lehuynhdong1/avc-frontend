import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarAvatarDropdownComponent } from './navbar-avatar-dropdown.component';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiDialogModule,
  TuiHostedDropdownModule
} from '@taiga-ui/core';
import { AvatarModule } from '@shared/ui/avatar';
import { RouterModule } from '@angular/router';

const tuiModules = [TuiHostedDropdownModule, TuiDataListModule, TuiButtonModule, TuiDialogModule];

@NgModule({
  declarations: [NavbarAvatarDropdownComponent],
  imports: [CommonModule, AvatarModule, RouterModule, tuiModules],
  exports: [NavbarAvatarDropdownComponent]
})
export class NavbarAvatarDropdownModule {}
