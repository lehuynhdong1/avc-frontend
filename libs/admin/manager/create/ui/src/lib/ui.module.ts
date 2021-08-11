import { ErrorHintModule } from '@shared/ui/error-hint';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePage } from './create.page';
import {
  TuiInputModule,
  TuiInputFileModule,
  TuiMarkerIconModule,
  TuiCheckboxLabeledModule,
  TuiInputPhoneModule
} from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiButtonModule,
  TuiHintControllerModule,
  TuiSvgModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import { DataUrlPipeModule } from '@shared/util';
import { AvatarModule } from '@shared/ui/avatar';
import { RouterModule } from '@angular/router';

const tuiModules = [
  TuiButtonModule,
  TuiSvgModule,
  TuiInputModule,
  TuiInputFileModule,
  TuiInputPhoneModule,
  TuiTextfieldControllerModule,
  TuiMarkerIconModule,
  TuiCheckboxLabeledModule,
  TuiHintControllerModule
];
@NgModule({
  declarations: [CreatePage],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    DataUrlPipeModule,
    AvatarModule,
    ErrorHintModule,
    tuiModules
  ],
  exports: [CreatePage]
})
export class UiModule {}
