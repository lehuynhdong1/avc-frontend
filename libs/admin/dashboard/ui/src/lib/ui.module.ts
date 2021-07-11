import { TuiSvgModule } from '@taiga-ui/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPage } from './dashboard.page';
import { TuiLineChartModule, TuiAxesModule } from '@taiga-ui/addon-charts';
import { HeatMapModule } from '@swimlane/ngx-charts';

@NgModule({
  imports: [CommonModule, TuiAxesModule, TuiLineChartModule, TuiSvgModule, HeatMapModule],
  declarations: [DashboardPage],
  exports: [DashboardPage]
})
export class DashboardUiModule {}
