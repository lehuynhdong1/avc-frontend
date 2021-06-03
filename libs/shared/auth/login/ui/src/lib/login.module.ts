import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedLoginComponent } from './login.component';
import { TuiButtonModule, TuiSvgModule, TuiLinkModule } from '@taiga-ui/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TuiInputModule, TuiInputPasswordModule, TuiCheckboxLabeledModule, TuiFieldErrorModule } from '@taiga-ui/kit';
import { TuiValidatorModule } from '@taiga-ui/cdk';
@NgModule({
  declarations: [SharedLoginComponent],
  imports: [
    CommonModule,
    TuiButtonModule,
    TuiSvgModule,
    FormsModule,
    ReactiveFormsModule,
    TuiInputModule,
    TuiInputPasswordModule,
    TuiCheckboxLabeledModule,
    TuiLinkModule,
    TuiValidatorModule,
    TuiFieldErrorModule,
  ],
  exports: [SharedLoginComponent]
})
export class SharedLoginModule {}
