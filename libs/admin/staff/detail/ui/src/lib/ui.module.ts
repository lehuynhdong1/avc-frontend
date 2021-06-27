import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailPage } from './detail.page';
import { TuiAvatarModule, TuiBadgeModule, TuiToggleModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiDataListModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiDataListWrapperModule, TuiMultiSelectModule } from '@taiga-ui/kit';
import { RouterModule } from '@angular/router';

const tuiModules = [
  TuiToggleModule,
  TuiAvatarModule,
  TuiBadgeModule,
  TuiDataListModule,
  TuiDataListWrapperModule,
  TuiMultiSelectModule,
  TuiSvgModule
];
@NgModule({
  declarations: [DetailPage],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ...tuiModules],
  exports: [DetailPage]
})
export class UiModule {}
