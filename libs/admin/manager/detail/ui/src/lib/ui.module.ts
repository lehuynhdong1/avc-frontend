import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailPage } from './detail.page';
import { TuiBadgeModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from '@shared/ui/avatar';
import { TuiButtonModule, TuiLinkModule, TuiLoaderModule, TuiSvgModule } from '@taiga-ui/core';
import { DynamicTableModule } from '@shared/ui/dynamic-table';

const tuiModules = [TuiSvgModule, TuiBadgeModule, TuiButtonModule, TuiLinkModule, TuiLoaderModule];
@NgModule({
  declarations: [DetailPage],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    AvatarModule,
    DynamicTableModule,
    ...tuiModules
  ],
  exports: [DetailPage]
})
export class UiModule {}
