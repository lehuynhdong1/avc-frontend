import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AvatarModule } from '@shared/ui/avatar';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiButtonModule, TuiHintModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiBadgeModule, TuiInputModule, TuiPaginationModule, TuiTagModule } from '@taiga-ui/kit';
import { ListingPage } from './listing.page';

const tuiModules = [
  TuiTableModule,
  TuiPaginationModule,
  TuiSvgModule,
  TuiInputModule,
  TuiHintModule,
  TuiTagModule,
  TuiBadgeModule,
  TuiButtonModule
];
@NgModule({
  declarations: [ListingPage],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, AvatarModule, ...tuiModules]
})
export class UiModule {}
