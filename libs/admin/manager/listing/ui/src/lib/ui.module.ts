import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingPage } from './listing.page';
import { TuiInputModule, TuiBadgeModule } from '@taiga-ui/kit';
import { TuiSvgModule } from '@taiga-ui/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicTableModule } from '@shared/ui/dynamic-table';

const tuiModules = [TuiSvgModule, TuiInputModule, TuiBadgeModule];
@NgModule({
  declarations: [ListingPage],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, DynamicTableModule, ...tuiModules]
})
export class UiModule {}
