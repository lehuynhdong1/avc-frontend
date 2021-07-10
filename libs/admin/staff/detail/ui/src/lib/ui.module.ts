import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailPage } from './detail.page';
import { TuiBadgeModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import {
  TuiButtonModule,
  TuiSvgModule,
  TuiLoaderModule,
  TuiFormatPhonePipeModule,
  TuiLinkModule
} from '@taiga-ui/core';
import { RouterModule } from '@angular/router';
import { AvatarModule } from '@shared/ui/avatar';
import { DynamicTableModule } from '@shared/ui/dynamic-table';

const tuiModules = [
  TuiBadgeModule,
  TuiSvgModule,
  TuiButtonModule,
  TuiLoaderModule,
  TuiFormatPhonePipeModule,
  TuiLinkModule
];
@NgModule({
  declarations: [DetailPage],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AvatarModule,
    DynamicTableModule,
    tuiModules
  ],
  exports: [DetailPage]
})
export class UiModule {}
