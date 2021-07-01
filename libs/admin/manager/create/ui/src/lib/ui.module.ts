import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePage } from './create.page';
import {
  TuiInputModule,
  TuiInputFileModule,
  TuiInputPasswordModule,
  TuiMarkerIconModule,
  TuiCheckboxLabeledModule,
  TuiInputPhoneModule
} from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiSvgModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { UtilModule } from '@shared/util';
import { AvatarModule } from '@shared/ui/avatar';
import { RouterModule } from '@angular/router';

const tuiModules = [
  TuiButtonModule,
  TuiSvgModule,
  TuiInputModule,
  TuiInputFileModule,
  TuiInputPasswordModule,
  TuiInputPhoneModule,
  TuiTextfieldControllerModule,
  TuiMarkerIconModule,
  TuiCheckboxLabeledModule
];
@NgModule({
  declarations: [CreatePage],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    UtilModule,
    AvatarModule,
    ...tuiModules
  ],
  exports: [CreatePage]
})
export class UiModule {}