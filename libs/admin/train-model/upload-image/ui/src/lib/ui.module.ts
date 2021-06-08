import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadImagePage } from './upload-image.page';
import { TuiInputFileModule, TuiStepperModule } from '@taiga-ui/kit';
import { TuiButtonModule } from '@taiga-ui/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const tuiModules = [TuiInputFileModule, TuiButtonModule, TuiStepperModule];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ...tuiModules],
  declarations: [UploadImagePage]
})
export class UiModule {}
