import { TuiSvgModule } from '@taiga-ui/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPage } from './dashboard.page';
import { PieChartModule, LineChartModule } from '@swimlane/ngx-charts';
import { RouterModule } from '@angular/router';

const tuiModules = [TuiSvgModule];

@NgModule({
  imports: [CommonModule, RouterModule, tuiModules, LineChartModule, PieChartModule],
  declarations: [DashboardPage],
  exports: [DashboardPage]
})
export class DashboardUiModule {}
