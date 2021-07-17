import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingComponent } from './listing.component';
import { IonicModule } from '@ionic/angular';
import { TuiLoaderModule } from '@taiga-ui/core';

@NgModule({
  imports: [CommonModule, IonicModule, TuiLoaderModule],
  declarations: [ListingComponent],
  exports: [ListingComponent]
})
export class UiModule {}
