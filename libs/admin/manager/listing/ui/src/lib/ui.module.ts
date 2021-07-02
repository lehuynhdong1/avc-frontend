import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingPage } from './listing.page';
import { TuiInputModule } from '@taiga-ui/kit';
import { TuiSvgModule, TuiButtonModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicTableModule } from '@shared/ui/dynamic-table';
import { AvailableFilterModule } from '@admin/core/ui';

const tuiModules = [TuiSvgModule, TuiInputModule, TuiButtonModule, TuiTextfieldControllerModule];
@NgModule({
  declarations: [ListingPage],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    DynamicTableModule,
    AvailableFilterModule,
    ...tuiModules
  ]
})
export class UiModule {}
