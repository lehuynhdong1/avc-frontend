import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailPage } from './detail.page';
import { TuiBadgeModule } from '@taiga-ui/kit';
import { TuiSvgModule, TuiButtonModule, TuiLoaderModule } from '@taiga-ui/core';
import { AvatarModule } from '@shared/ui/avatar';
import { RouterModule } from '@angular/router';
import { BackBarModule } from '@mobile/core/ui';
import { IonicModule } from '@ionic/angular';

const tuiModules = [TuiBadgeModule, TuiSvgModule, TuiButtonModule, TuiLoaderModule];
@NgModule({
  declarations: [DetailPage],
  imports: [CommonModule, RouterModule, AvatarModule, IonicModule, BackBarModule, tuiModules],
  exports: [DetailPage]
})
export class DetailUiModule {}
