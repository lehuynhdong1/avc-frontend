import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiPaginationModule, TuiBadgeModule } from '@taiga-ui/kit';
import { RouterModule } from '@angular/router';
import { DynamicTableComponent } from './dynamic-table.component';
import { BooleanColumnComponent } from './components/boolean-column.component';

const tuiModules = [TuiTableModule, TuiPaginationModule, TuiBadgeModule];
@NgModule({
  declarations: [DynamicTableComponent, BooleanColumnComponent],
  imports: [CommonModule, RouterModule, ...tuiModules],
  exports: [DynamicTableComponent]
})
export class DynamicTableModule {}
