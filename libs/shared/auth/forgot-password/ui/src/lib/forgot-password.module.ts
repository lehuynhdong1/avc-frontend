import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedForgotPasswordComponent } from './forgot-password.component';
import { TuiButtonModule, TuiLinkModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule, TuiFieldErrorModule } from '@taiga-ui/kit';
import { TuiValidatorModule } from '@taiga-ui/cdk';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [SharedForgotPasswordComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    TuiButtonModule,
    TuiInputModule,
    TuiTextfieldControllerModule,
    TuiLinkModule,
    TuiValidatorModule,
    TuiFieldErrorModule
  ],
  exports: [SharedForgotPasswordComponent]
})
export class SharedForgotPasswordModule {}
