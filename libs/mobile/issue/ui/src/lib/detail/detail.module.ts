import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailPage } from './detail.page';
import { TuiLoaderModule } from '@taiga-ui/core';
import { RouterModule } from '@angular/router';
import { AvatarModule } from '@shared/ui/avatar';
import { IonicModule } from '@ionic/angular';
import { BackBarModule } from '@mobile/core/ui';

const tuiModules = [TuiLoaderModule];
@NgModule({
  declarations: [DetailPage],
  imports: [CommonModule, RouterModule, AvatarModule, IonicModule, BackBarModule, tuiModules],
  exports: [DetailPage]
})
export class DetailUiModule {}
