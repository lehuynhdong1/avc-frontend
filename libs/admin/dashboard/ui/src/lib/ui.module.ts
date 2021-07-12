import { TuiSvgModule } from '@taiga-ui/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPage } from './dashboard.page';
import { TuiLineChartModule, TuiAxesModule, TuiLineDaysChartModule } from '@taiga-ui/addon-charts';
import { HeatMapModule, LineChartModule } from '@swimlane/ngx-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { TuiInputDateRangeModule } from '@taiga-ui/kit';

const tuiModules = [
  TuiAxesModule,
  TuiLineChartModule,
  TuiLineDaysChartModule,
  TuiInputDateRangeModule,
  TuiSvgModule
];

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, tuiModules, HeatMapModule, LineChartModule],
  declarations: [DashboardPage],
  exports: [DashboardPage]
})
export class DashboardUiModule {}
