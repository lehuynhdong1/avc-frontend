import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovePage } from './approve.page';
import {
  TuiInputFileModule,
  TuiInputModule,
  TuiMarkerIconModule,
  TuiSelectModule
} from '@taiga-ui/kit';
import {
  TuiButtonModule,
  TuiTextfieldControllerModule,
  TuiDataListModule,
  TuiSvgModule
} from '@taiga-ui/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AvatarModule } from '@shared/ui/avatar';
import { DataUrlPipeModule } from '@shared/util';
import { TuiDataListWrapperModule } from '@taiga-ui/kit';
import { TuiLetModule } from '@taiga-ui/cdk';

const tuiModules = [
  TuiInputModule,
  TuiInputFileModule,
  TuiTextfieldControllerModule,
  TuiButtonModule,
  TuiMarkerIconModule,
  TuiSelectModule,
  TuiDataListModule,
  TuiDataListWrapperModule,
  TuiLetModule,
  TuiSvgModule
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    DataUrlPipeModule,
    AvatarModule,
    tuiModules
  ],
  declarations: [ApprovePage],
  exports: [ApprovePage]
})
export class ApproveUiModule {}
