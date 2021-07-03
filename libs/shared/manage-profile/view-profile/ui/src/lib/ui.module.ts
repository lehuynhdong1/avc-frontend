import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProfilePage } from './view-profile.page';
import { AvatarModule } from '@shared/ui/avatar';
import {
  TuiButtonModule,
  TuiLoaderModule,
  TuiSvgModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import { RouterModule } from '@angular/router';
import { TuiInputInlineModule, TuiInputPhoneModule, TuiMarkerIconModule } from '@taiga-ui/kit';
import { UtilModule } from '@shared/util';

const tuiModules = [
  TuiLoaderModule,
  TuiButtonModule,
  TuiSvgModule,
  TuiMarkerIconModule,
  UtilModule,
  TuiInputPhoneModule,
  TuiInputInlineModule,
  TuiTextfieldControllerModule
];

@NgModule({
  imports: [CommonModule, AvatarModule, ReactiveFormsModule, RouterModule, tuiModules],
  declarations: [ViewProfilePage],
  exports: [ViewProfilePage]
})
export class UiModule {}
