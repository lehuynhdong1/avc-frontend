import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingPage } from './listing.page';
import { IonicModule } from '@ionic/angular';
import { TuiLoaderModule } from '@taiga-ui/core';
import { NotificationIconPipeModule } from '@shared/util';
import { TimeagoModule } from 'ngx-timeago';

@NgModule({
  imports: [CommonModule, IonicModule, TuiLoaderModule, NotificationIconPipeModule, TimeagoModule],
  declarations: [ListingPage],
  exports: [ListingPage]
})
export class UiModule {}
