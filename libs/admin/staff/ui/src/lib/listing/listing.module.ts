import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingPage } from './listing.page';
import { TuiTableModule } from '@taiga-ui/addon-table';

@NgModule({
  declarations: [ListingPage],
  imports: [CommonModule, TuiTableModule],
  exports: [ListingPage]
})
export class ListingModule {}
