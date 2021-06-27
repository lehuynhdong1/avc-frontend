import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingPage } from './listing.page';
import { TuiTableModule, TuiTablePaginationModule } from '@taiga-ui/addon-table';
import { TuiToggleModule, TuiAvatarModule, TuiInputModule } from '@taiga-ui/kit';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const tuiModules = [
  TuiTableModule,
  TuiTablePaginationModule,
  TuiToggleModule,
  TuiAvatarModule,
  TuiSvgModule,
  TuiInputModule,
  TuiButtonModule
];
@NgModule({
  declarations: [ListingPage],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, ...tuiModules]
})
export class UiModule {}
