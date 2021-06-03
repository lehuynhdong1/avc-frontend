import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedLoginComponent } from './login.component';
import { TuiButtonModule, TuiSvgModule, TuiLinkModule } from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  TuiInputModule,
  TuiInputPasswordModule,
  TuiCheckboxLabeledModule,
  TuiFieldErrorModule
} from '@taiga-ui/kit';
import { TuiValidatorModule } from '@taiga-ui/cdk';
import { DataAccessModule } from '@shared/auth/login/data-access';

const tuiModules = [
  TuiButtonModule,
  TuiSvgModule,
  TuiInputModule,
  TuiInputPasswordModule,
  TuiCheckboxLabeledModule,
  TuiLinkModule,
  TuiValidatorModule,
  TuiFieldErrorModule
];
@NgModule({
  declarations: [SharedLoginComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, DataAccessModule, ...tuiModules],
  exports: [SharedLoginComponent]
})
export class SharedLoginModule {}
