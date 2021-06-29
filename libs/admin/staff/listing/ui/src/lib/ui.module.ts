import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingPage } from './listing.page';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiInputModule, TuiBadgeModule, TuiPaginationModule, TuiTagModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const tuiModules = [
  TuiTableModule,
  TuiSvgModule,
  TuiPaginationModule,
  TuiInputModule,
  TuiButtonModule,
  TuiBadgeModule,
  TuiTagModule
];
@NgModule({
  declarations: [ListingPage],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ...tuiModules]
})
export class UiModule {}
