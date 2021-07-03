import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnapprovePage } from './unapprove.page';
import { DynamicTableModule } from '@shared/ui/dynamic-table';
import { RouterModule } from '@angular/router';
import { TuiInputModule } from '@taiga-ui/kit';
import {
  TuiSvgModule,
  TuiButtonModule,
  TuiLoaderModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import { ReactiveFormsModule } from '@angular/forms';

const tuiModules = [
  TuiSvgModule,
  TuiInputModule,
  TuiTextfieldControllerModule,
  TuiButtonModule,
  TuiLoaderModule
];

@NgModule({
  imports: [CommonModule, RouterModule, ReactiveFormsModule, DynamicTableModule, tuiModules],
  declarations: [UnapprovePage],
  exports: [UnapprovePage]
})
export class UiModule {}
