import { NgModule } from '@angular/core';
import { AvailableFilterComponent } from './available-filter.component';

import { TuiSelectModule, TuiDataListWrapperModule, TuiBadgeModule } from '@taiga-ui/kit';
import { TuiDataListModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StatusPipe } from './status.pipe';

const tuiModules = [
  TuiBadgeModule,
  TuiTextfieldControllerModule,
  TuiSelectModule,
  TuiDataListModule,
  TuiDataListWrapperModule
];

@NgModule({
  declarations: [AvailableFilterComponent, StatusPipe],
  imports: [tuiModules, ReactiveFormsModule],
  exports: [AvailableFilterComponent]
})
export class AvailableFilterModule {}
