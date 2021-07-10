import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadZipPage } from './upload-zip.page';
import { TuiBadgeModule, TuiInputFileModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiNotificationModule, TuiSvgModule } from '@taiga-ui/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const tuiModules = [
  TuiInputFileModule,
  TuiButtonModule,
  TuiBadgeModule,
  TuiSvgModule,
  TuiNotificationModule
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule, tuiModules],
  declarations: [UploadZipPage],
  exports: [UploadZipPage]
})
export class UploadZipUiModule {}
