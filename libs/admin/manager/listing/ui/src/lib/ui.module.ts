import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingPage } from './listing.page';
import { TuiTableModule, TuiTablePaginationModule } from '@taiga-ui/addon-table';
import { TuiToggleModule, TuiInputModule } from '@taiga-ui/kit';
import { TuiSidebarModule } from '@taiga-ui/addon-mobile';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import { TuiSvgModule } from '@taiga-ui/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from '@shared/ui/avatar';

const tuiModules = [
  TuiTableModule,
  TuiTablePaginationModule,
  TuiToggleModule,
  TuiSidebarModule,
  TuiActiveZoneModule,
  TuiActiveZoneModule,
  TuiSvgModule,
  TuiInputModule
];
@NgModule({
  declarations: [ListingPage],
  imports: [CommonModule, RouterModule, ReactiveFormsModule, AvatarModule, ...tuiModules]
})
export class UiModule {}
