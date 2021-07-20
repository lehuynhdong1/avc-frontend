import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatePage } from './update.page';
import {
  TuiInputFileModule,
  TuiInputModule,
  TuiInputPhoneModule,
  TuiMarkerIconModule,
  TuiSelectModule
} from '@taiga-ui/kit';
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
import { DataUrlPipeModule } from '@shared/util';

const tuiModules = [
  TuiDataListModule,
  TuiButtonModule,
  TuiSvgModule,
  TuiInputModule,
  TuiInputFileModule,
  TuiTextfieldControllerModule,
  TuiSelectModule,
  TuiLetModule,
  TuiInputPhoneModule,
  TuiMarkerIconModule
];
@NgModule({
  declarations: [UpdatePage],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    DataUrlPipeModule,
    AvatarModule,
    tuiModules
  ],
  exports: [UpdatePage]
})
export class UpdateUiModule {}
