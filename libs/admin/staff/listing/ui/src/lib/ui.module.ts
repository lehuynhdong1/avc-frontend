import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListingPage } from './listing.page';
import { TuiTableModule } from '@taiga-ui/addon-table';
import { TuiToggleModule, TuiAvatarModule } from '@taiga-ui/kit';
import { TuiSidebarModule } from '@taiga-ui/addon-mobile';
import { TuiActiveZoneModule } from '@taiga-ui/cdk';
import { TuiSvgModule } from '@taiga-ui/core';
import { RouterModule } from '@angular/router';

const tuiModules = [
  TuiTableModule,
  TuiToggleModule,
  TuiSidebarModule,
  TuiActiveZoneModule,
  TuiAvatarModule,
  TuiActiveZoneModule,
  TuiSvgModule
];
@NgModule({
  declarations: [ListingPage],
  imports: [CommonModule, RouterModule, ...tuiModules]
})
export class UiModule {}
