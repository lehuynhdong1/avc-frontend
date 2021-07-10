import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadZipPage } from './upload-zip.page';
import { TuiBadgeModule, TuiInputFileModule, TuiStepperModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const tuiModules = [
  TuiInputFileModule,
  TuiButtonModule,
  TuiStepperModule,
  TuiBadgeModule,
  TuiSvgModule
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule, tuiModules],
  declarations: [UploadZipPage],
  exports: [UploadZipPage]
})
export class UploadZipUiModule {}
