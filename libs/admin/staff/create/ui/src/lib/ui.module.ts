import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreatePage } from './create.page';
import {
  TuiInputModule,
  TuiInputFileModule,
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
  TuiHintControllerModule,
  TuiSvgModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import { DataUrlPipeModule } from '@shared/util';
import { AvatarModule } from '@shared/ui/avatar';
import { TuiLetModule } from '@taiga-ui/cdk';
import { RouterModule } from '@angular/router';
import { ErrorHintModule } from '@shared/ui/error-hint';

const tuiModules = [
  TuiDataListModule,
  TuiDataListWrapperModule,
  TuiButtonModule,
  TuiSvgModule,
  TuiInputModule,
  TuiInputFileModule,
  TuiInputPhoneModule,
  TuiTextfieldControllerModule,
  TuiSelectModule,
  TuiLetModule,
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
