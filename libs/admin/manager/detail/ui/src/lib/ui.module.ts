import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailPage } from './detail.page';
import { TuiBadgeModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from '@shared/ui/avatar';
import { TuiButtonModule, TuiLinkModule, TuiSvgModule } from '@taiga-ui/core';

const tuiModules = [TuiSvgModule, TuiBadgeModule, TuiButtonModule, TuiLinkModule];
@NgModule({
  declarations: [DetailPage],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, AvatarModule, ...tuiModules],
  exports: [DetailPage]
})
export class UiModule {}
