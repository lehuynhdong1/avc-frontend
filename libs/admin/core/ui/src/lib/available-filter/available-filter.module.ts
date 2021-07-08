import { NgModule } from '@angular/core';
import { AvailableFilterComponent } from './available-filter.component';

import { TuiSelectModule, TuiDataListWrapperModule, TuiBadgeModule } from '@taiga-ui/kit';
import { TuiDataListModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StatusPipe } from './status.pipe';
import { CommonModule } from '@angular/common';

const tuiModules = [
  TuiBadgeModule,
  TuiTextfieldControllerModule,
  TuiSelectModule,
  TuiDataListModule,
  TuiDataListWrapperModule
];

@NgModule({
  declarations: [AvailableFilterComponent, StatusPipe],
  imports: [CommonModule, tuiModules, ReactiveFormsModule],
  exports: [AvailableFilterComponent]
})
export class AvailableFilterModule {}
