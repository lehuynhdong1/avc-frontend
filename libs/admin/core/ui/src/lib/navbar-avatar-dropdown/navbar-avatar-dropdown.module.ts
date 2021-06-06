import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarAvatarDropdownComponent } from './navbar-avatar-dropdown.component';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiHostedDropdownModule,
  TuiSvgModule
} from '@taiga-ui/core';
import { TuiAvatarModule } from '@taiga-ui/kit';

const tuiModules = [
  TuiAvatarModule,
  TuiHostedDropdownModule,
  TuiDataListModule,
  TuiSvgModule,
  TuiButtonModule
];

@NgModule({
  declarations: [NavbarAvatarDropdownComponent],
  imports: [CommonModule, ...tuiModules],
  exports: [NavbarAvatarDropdownComponent]
})
export class NavbarAvatarDropdownModule {}
