import { Store } from '@ngxs/store';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { WeekDay } from '@angular/common';
import { of } from 'rxjs';

const mockData = {
  car: { total: 10, deactivated: 3 },
  manager: { total: 10, deactivated: 3 },
  staff: { total: 10, deactivated: 3 },
  issue: { total: 10, deactivated: 3 },
  topFiveCarIssue: [
    { id: 1, name: 'Car Superman', issues: [5, 2, 7, 2, 5, 9, 2] },
    { id: 2, name: 'Car Batman', issues: [2, 2, 5, 7, 2, 8, 2] },
    { id: 3, name: 'Car Minion', issues: [3, 4, 4, 1, 5, 6, 7] },
    { id: 4, name: 'Car Flyen', issues: [1, 2, 4, 2, 1, 2, 2] },
    { id: 5, name: 'Car Calendar', issues: [2, 6, 7, 3, 8, 2, 2] }
  ],
  pieChartCar: { total: 10, connecting: 3, disconnected: 2, unapprovedCount: 1 }
};
@Component({
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPage {
  view: [number, number] = [innerWidth / 1.3, 400];

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  mockData$ = of(mockData);

  topFiveCarIssues$ = this.mockData$.pipe(
    map(({ topFiveCarIssue }) => {
      const today = new Date().getDay();
      return topFiveCarIssue.map((car) => ({
        ...car,
        series: car.issues.map((issueCount, index) => ({
          name: WeekDay[(today + index) % 7],
          value: issueCount
        }))
      }));
    })
  );

  pieChartCar$ = this.mockData$.pipe(
    map(({ pieChartCar }) => {
      type Key = 'total' | 'connecting' | 'disconnected' | 'unapprovedCount';
      return Object.keys(pieChartCar)
        .filter((key) => key !== 'total')
        .map((key) => ({ name: key, value: pieChartCar[key as Key] }));
    })
  );

  constructor(private store: Store) {}
}
