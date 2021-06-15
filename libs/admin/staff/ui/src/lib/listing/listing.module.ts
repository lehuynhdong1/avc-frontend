import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingPage } from './listing.page';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiToggleModule } from '@taiga-ui/kit';

const tuiModules = [TuiTableModule, TuiToggleModule];
@NgModule({
  declarations: [ListingPage],
  imports: [CommonModule, ...tuiModules]
})
export class ListingModule {}
