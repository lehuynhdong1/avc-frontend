import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProfilePage } from './view-profile.page';
import { AvatarModule } from '@shared/ui/avatar';
import { TuiButtonModule, TuiLoaderModule, TuiSvgModule } from '@taiga-ui/core';
import { RouterModule } from '@angular/router';

const tuiModules = [TuiLoaderModule, TuiButtonModule, TuiSvgModule];

@NgModule({
  imports: [CommonModule, AvatarModule, RouterModule, ...tuiModules],
  declarations: [ViewProfilePage],
  exports: [ViewProfilePage]
})
export class UiModule {}
