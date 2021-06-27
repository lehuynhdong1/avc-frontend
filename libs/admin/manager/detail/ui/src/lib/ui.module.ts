import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailPage } from './detail.page';
import { TuiAvatarModule, TuiBadgeModule, TuiToggleModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiDataListModule } from '@taiga-ui/core';
import { TuiDataListWrapperModule, TuiMultiSelectModule } from '@taiga-ui/kit';

const tuiModules = [
  TuiToggleModule,
  TuiAvatarModule,
  TuiBadgeModule,
  TuiDataListModule,
  TuiDataListWrapperModule,
  TuiMultiSelectModule
];
@NgModule({
  declarations: [DetailPage],
  imports: [CommonModule, ReactiveFormsModule, ...tuiModules],
  exports: [DetailPage]
})
export class UiModule {}
