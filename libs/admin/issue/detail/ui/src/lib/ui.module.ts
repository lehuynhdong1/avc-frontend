import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailPage } from './detail.page';
import { TuiAvatarModule, TuiBadgeModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiDataListModule, TuiSvgModule, TuiLoaderModule } from '@taiga-ui/core';
import { TuiDataListWrapperModule, TuiMultiSelectModule } from '@taiga-ui/kit';
import { RouterModule } from '@angular/router';

const tuiModules = [
  TuiAvatarModule,
  TuiBadgeModule,
  TuiDataListModule,
  TuiDataListWrapperModule,
  TuiMultiSelectModule,
  TuiSvgModule,
  TuiButtonModule,
  TuiLoaderModule
];
@NgModule({
  declarations: [DetailPage],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, tuiModules],
  exports: [DetailPage]
})
export class UiModule {}
