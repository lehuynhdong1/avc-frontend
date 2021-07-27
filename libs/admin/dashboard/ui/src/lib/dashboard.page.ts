import { Store } from '@ngxs/store';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WeekDay } from '@angular/common';
import { DashboardState, LoadDashboard, StateModel } from '@admin/dashboard/data-access';
import { hasValue } from '@shared/util';
import { IssueState, LoadIssues } from '@shared/features/issue/data-access';

const pieChartTitleMapper = {
  connecting: 'Connecting',
  disconnected: 'Disconnected',
  rejected: 'Rejected',
  total: 'Total',
  unapprovedCount: 'Pending'
};
type PieChartKey = keyof typeof pieChartTitleMapper;

@Component({
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPage {
  viewSize: [number, number] = [innerWidth / 1.3, 400];
  pieChartViewSize: [number, number] = [((innerWidth / 1.3) * 2) / 3, 400];
  horizontalChartViewSize: [number, number] = [innerWidth / 1.3, 200];

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  data$ = this.store.select(DashboardState.dashboard).pipe(hasValue());
  issues$ = this.store.select(IssueState.issues);

  readonly topFiveCarIssuesMapper = (dashboard: StateModel['dashboard'] | null) => {
    if (!dashboard) return;
    const { topFiveCarIssue } = dashboard;
    const today = new Date().getDay();
    return topFiveCarIssue?.map((car) => ({
      ...car,
      series: car.issues?.map((issueCount, index) => ({
        name: WeekDay[(today + index) % 7],
        value: issueCount
      }))
    }));
  };

  readonly pieChartMapper = (dashboard: StateModel['dashboard'] | null) => {
    if (!dashboard?.pieChartCar) return;
    const { pieChartCar } = dashboard;
    return Object.keys(pieChartCar)
      .filter((key) => key !== 'total')
      .map((key) => ({
        name: pieChartTitleMapper[key as PieChartKey],
        value: pieChartCar[key as PieChartKey]
      }));
  };

  readonly horizontalChartMapper = (dashboard: StateModel['dashboard'] | null) => {
    if (!dashboard?.topFiveCarIssue) return;
    const { topFiveCarIssue } = dashboard;
    return topFiveCarIssue
      ?.map((car) => ({
        name: car.name,
        value: car.issues?.reduce((acc, issueCount) => acc + issueCount)
      }))
      .sort(({ value }, { value: nextValue }) => {
        if (value && nextValue) return nextValue - value;
        return 0;
      });
  };

  constructor(private store: Store) {
    this.store.dispatch([new LoadDashboard(), new LoadIssues({ limit: 5 })]);
  }
}
