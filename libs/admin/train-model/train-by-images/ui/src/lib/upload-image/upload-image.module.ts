import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadImagePage } from './upload-image.page';
import { TuiBadgeModule, TuiInputFileModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

const tuiModules = [TuiInputFileModule, TuiButtonModule, TuiBadgeModule, TuiSvgModule];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule, tuiModules],
  declarations: [UploadImagePage]
})
export class UploadImageUiModule {}
