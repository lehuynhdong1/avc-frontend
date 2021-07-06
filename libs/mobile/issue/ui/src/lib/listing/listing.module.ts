import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingPage } from './listing.page';
import { TuiLoaderModule } from '@taiga-ui/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ListingPage],
  imports: [CommonModule, RouterModule, IonicModule, ReactiveFormsModule, TuiLoaderModule]
})
export class ListingUiModule {}
