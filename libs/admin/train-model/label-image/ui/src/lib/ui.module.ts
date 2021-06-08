import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelImagePage } from './label-image.page';
import { TuiInputFileModule } from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';
import { ReactiveFormsModule } from '@angular/forms';

const tuiModules = [TuiInputFileModule, TuiButtonModule];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, ...tuiModules],
  declarations: [LabelImagePage],
  exports: [LabelImagePage]
})
export class UiModule {}
