import { TuiSvgModule } from '@taiga-ui/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardPage } from './dashboard.page';
import { TuiLineChartModule, TuiAxesModule } from '@taiga-ui/addon-charts';
@NgModule({
  imports: [CommonModule, TuiAxesModule, TuiLineChartModule, TuiSvgModule],
  declarations: [DashboardPage],
  exports: [DashboardPage]
})
export class UiModule {}
