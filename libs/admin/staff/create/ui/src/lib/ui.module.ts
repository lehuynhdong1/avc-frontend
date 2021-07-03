import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePage } from './create.page';
import {
  TuiInputModule,
  TuiInputFileModule,
  TuiInputPasswordModule,
  TuiSelectModule,
  TuiDataListWrapperModule,
  TuiMarkerIconModule,
  TuiCheckboxLabeledModule,
  TuiInputPhoneModule
} from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiButtonModule,
  TuiDataListModule,
  TuiSvgModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import { UtilModule } from '@shared/util';
import { AvatarModule } from '@shared/ui/avatar';
import { TuiLetModule } from '@taiga-ui/cdk';
import { RouterModule } from '@angular/router';

const tuiModules = [
  TuiDataListModule,
  TuiDataListWrapperModule,
  TuiButtonModule,
  TuiSvgModule,
  TuiInputModule,
  TuiInputFileModule,
  TuiInputPhoneModule,
  TuiInputPasswordModule,
  TuiTextfieldControllerModule,
  TuiSelectModule,
  TuiLetModule,
  TuiMarkerIconModule,
  TuiCheckboxLabeledModule
];
@NgModule({
  declarations: [CreatePage],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, UtilModule, AvatarModule, tuiModules],
  exports: [CreatePage]
})
export class UiModule {}
