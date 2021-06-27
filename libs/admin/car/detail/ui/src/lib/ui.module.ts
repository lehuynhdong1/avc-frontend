import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailPage } from './detail.page';
import { TuiBadgeModule } from '@taiga-ui/kit';
import { TuiSvgModule, TuiHintModule, TuiButtonModule } from '@taiga-ui/core';
import { AvatarModule } from '@shared/ui/avatar';
import { RouterModule } from '@angular/router';

const tuiModules = [TuiBadgeModule, TuiSvgModule, TuiHintModule, TuiButtonModule];
@NgModule({
  declarations: [DetailPage],
  imports: [CommonModule, RouterModule, AvatarModule, ...tuiModules],
  exports: [DetailPage]
})
export class UiModule {}
