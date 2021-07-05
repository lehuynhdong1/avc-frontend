import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedResetPasswordComponent } from './reset-password.component';
import {
  TuiButtonModule,
  TuiSvgModule,
  TuiLinkModule,
  TuiNotificationModule,
  TuiTextfieldControllerModule,
  TuiHintControllerModule
} from '@taiga-ui/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInputPasswordModule, TuiInputModule } from '@taiga-ui/kit';
import { RouterModule } from '@angular/router';
import { DataAccessModule } from '@shared/auth/reset-password/data-access';

const tuiModules = [
  TuiButtonModule,
  TuiSvgModule,
  TuiInputPasswordModule,
  TuiLinkModule,
  TuiInputModule,
  TuiNotificationModule,
  TuiTextfieldControllerModule,
  TuiHintControllerModule
];
@NgModule({
  declarations: [SharedResetPasswordComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, DataAccessModule, tuiModules],
  exports: [SharedResetPasswordComponent]
})
export class SharedResetPasswordModule {}
