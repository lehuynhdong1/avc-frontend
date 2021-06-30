import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DynamicTableModule } from '@shared/ui/dynamic-table';
import { TuiButtonModule, TuiSvgModule } from '@taiga-ui/core';
import { TuiInputModule } from '@taiga-ui/kit';
import { ListingPage } from './listing.page';

const tuiModules = [TuiSvgModule, TuiInputModule, TuiButtonModule];
@NgModule({
  declarations: [ListingPage],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, DynamicTableModule, ...tuiModules]
})
export class UiModule {}
