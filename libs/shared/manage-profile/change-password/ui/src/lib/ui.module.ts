import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordPage } from './change-password.page';
import { TuiInputPasswordModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiSvgModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { RouterModule } from '@angular/router';

const tuiModules = [
  TuiButtonModule,
  TuiSvgModule,
  TuiInputPasswordModule,
  TuiTextfieldControllerModule
];
@NgModule({
  declarations: [ChangePasswordPage],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ...tuiModules],
  exports: [ChangePasswordPage]
})
export class UiModule {}
