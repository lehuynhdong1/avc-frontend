import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailPage } from './detail.page';
import { TuiAvatarModule, TuiBadgeModule, TuiToggleModule } from '@taiga-ui/kit';
import { ReactiveFormsModule } from '@angular/forms';

const tuiModules = [TuiToggleModule, TuiAvatarModule, TuiBadgeModule, TuiToggleModule];
@NgModule({
  declarations: [DetailPage],
  imports: [CommonModule, ReactiveFormsModule, ...tuiModules],
  exports: [DetailPage]
})
export class UiModule {}
