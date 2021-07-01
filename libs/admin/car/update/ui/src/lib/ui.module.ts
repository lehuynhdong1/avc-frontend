import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatePage } from './update.page';
import { TuiInputModule, TuiInputPhoneModule, TuiSelectModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiSvgModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import { AvatarModule } from '@shared/ui/avatar';
import { TuiLetModule } from '@taiga-ui/cdk';
import { RouterModule } from '@angular/router';

const tuiModules = [
  TuiDataListModule,
  TuiButtonModule,
  TuiSvgModule,
  TuiInputModule,
  TuiTextfieldControllerModule,
  TuiSelectModule,
  TuiLetModule,
  TuiInputPhoneModule
];
@NgModule({
  declarations: [UpdatePage],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, AvatarModule, ...tuiModules],
  exports: [UpdatePage]
})
export class UiModule {}
