import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingPage } from './listing.page';
import {
  TuiInputModule,
  TuiSelectModule,
  TuiDataListWrapperModule,
  TuiBadgeModule
} from '@taiga-ui/kit';
import {
  TuiDataListModule,
  TuiSvgModule,
  TuiButtonModule,
  TuiTextfieldControllerModule
} from '@taiga-ui/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicTableModule } from '@shared/ui/dynamic-table';

const tuiModules = [
  TuiSvgModule,
  TuiInputModule,
  TuiButtonModule,
  TuiBadgeModule,
  TuiTextfieldControllerModule,
  TuiSelectModule,
  TuiDataListModule,
  TuiDataListWrapperModule
];
@NgModule({
  declarations: [ListingPage],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, DynamicTableModule, ...tuiModules]
})
export class UiModule {}
