import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ListingPage } from './listing.page';
import { BackBarModule } from '@mobile/core/ui';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiLoaderModule } from '@taiga-ui/core';

@NgModule({
  declarations: [ListingPage],
  imports: [
    CommonModule,
    RouterModule,
    IonicModule,
    BackBarModule,
    ReactiveFormsModule,
    TuiLoaderModule
  ],
  exports: [ListingPage]
})
export class ListingUiModule {}
