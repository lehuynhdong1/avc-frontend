import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LabelImagePage } from './label-image.page';
import { TuiInputFileModule, TuiMarkerIconModule, TuiStepperModule } from '@taiga-ui/kit';
import {
  TuiButtonModule,
  TuiDialogModule,
  TuiNotificationModule,
  TuiSvgModule
} from '@taiga-ui/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PolymorpheusModule } from '@tinkoff/ng-polymorpheus';
import { IMAGE_DIALOG_PROVIDER } from '../image-dialog';

const tuiModules = [
  TuiInputFileModule,
  TuiButtonModule,
  TuiStepperModule,
  TuiDialogModule,
  TuiNotificationModule,
  PolymorpheusModule,
  TuiSvgModule,
  TuiMarkerIconModule
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, RouterModule, tuiModules],
  declarations: [LabelImagePage],
  exports: [LabelImagePage],
  providers: [IMAGE_DIALOG_PROVIDER]
})
export class LabelImageUiModule {}
