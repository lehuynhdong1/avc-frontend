import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password.component';
import { TuiInputPasswordModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiButtonModule,
  TuiHintControllerModule,
  TuiSvgModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import { RouterModule } from '@angular/router';

const tuiModules = [
  TuiButtonModule,
  TuiSvgModule,
  TuiInputPasswordModule,
  TuiTextfieldControllerModule,
  TuiHintControllerModule
];
@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, tuiModules],
  exports: [ChangePasswordComponent]
})
export class ChangePasswordComponentModule {}
