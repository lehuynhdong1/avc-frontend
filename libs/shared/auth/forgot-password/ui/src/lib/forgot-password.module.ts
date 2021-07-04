import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedForgotPasswordComponent } from './forgot-password.component';
import {
  TuiButtonModule,
  TuiHintControllerModule,
  TuiLinkModule,
  TuiSvgModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule, TuiFieldErrorModule, TuiBadgeModule } from '@taiga-ui/kit';
import { TuiValidatorModule } from '@taiga-ui/cdk';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [SharedForgotPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TuiButtonModule,
    TuiBadgeModule,
    TuiSvgModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiLinkModule,
    TuiHintControllerModule,
    TuiValidatorModule,
    TuiFieldErrorModule
  ],
  exports: [SharedForgotPasswordComponent]
})
export class SharedForgotPasswordModule {}
