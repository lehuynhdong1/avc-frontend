import { TimeagoModule } from 'ngx-timeago';
import { TuiDataListModule, TuiSvgModule } from '@taiga-ui/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPage } from './dashboard.page';
import { PieChartModule, LineChartModule, BarChartModule } from '@swimlane/ngx-charts';
import { RouterModule } from '@angular/router';
import { TuiMapperPipeModule } from '@taiga-ui/cdk';

const tuiModules = [TuiSvgModule, TuiMapperPipeModule, TuiDataListModule];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    tuiModules,
    LineChartModule,
    PieChartModule,
    BarChartModule,
    TimeagoModule
  ],
  declarations: [DashboardPage],
  exports: [DashboardPage]
})
export class DashboardUiModule {}
