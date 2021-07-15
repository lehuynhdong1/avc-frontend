import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailPage } from './detail.page';
import { TuiBadgeModule } from '@taiga-ui/kit';
import { TuiSvgModule, TuiButtonModule, TuiLoaderModule } from '@taiga-ui/core';
import { RouterModule } from '@angular/router';

const tuiModules = [TuiBadgeModule, TuiSvgModule, TuiButtonModule, TuiLoaderModule];
@NgModule({
  declarations: [DetailPage],
  imports: [CommonModule, RouterModule, tuiModules],
  exports: [DetailPage]
})
export class DetailUiModule {}
