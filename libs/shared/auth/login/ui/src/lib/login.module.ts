import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedLoginComponent } from './login.component';
import {
  TuiButtonModule,
  TuiSvgModule,
  TuiLinkModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule, TuiInputPasswordModule, TuiCheckboxLabeledModule } from '@taiga-ui/kit';

const tuiModules = [
  TuiButtonModule,
  TuiSvgModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiCheckboxLabeledModule,
  TuiLinkModule,
  TuiTextfieldControllerModule
];
@NgModule({
  declarations: [SharedLoginComponent],
  imports: [CommonModule, ReactiveFormsModule, tuiModules],
  exports: [SharedLoginComponent]
})
export class SharedLoginModule {}
