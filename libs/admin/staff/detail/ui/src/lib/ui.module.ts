import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailPage } from './detail.page';
import { TuiAvatarModule, TuiBadgeModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiButtonModule, TuiDataListModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiDataListWrapperModule, TuiMultiSelectModule } from '@taiga-ui/kit';
import { RouterModule } from '@angular/router';
import { AvatarModule } from '@shared/ui/avatar';

const tuiModules = [
  TuiAvatarModule,
  TuiBadgeModule,
  TuiDataListModule,
  TuiDataListWrapperModule,
  TuiMultiSelectModule,
  TuiSvgModule,
  TuiButtonModule
];
@NgModule({
  declarations: [DetailPage],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, AvatarModule, ...tuiModules],
  exports: [DetailPage]
})
export class UiModule {}
