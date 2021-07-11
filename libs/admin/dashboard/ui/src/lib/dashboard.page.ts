import { Store } from '@ngxs/store';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CarState, LoadApprovedCars } from '@shared/features/car/data-access';
import { hasValue } from '@shared/util';
import { StaffState, LoadStaffs } from '@shared/features/staff/data-access';
import { ManagerState, LoadManagers } from '@shared/features/manager/data-access';
import { map } from 'rxjs/operators';
import { AccountReadDtoPagingResponseDto } from '@shared/api';

function toIdAndName({ result }: AccountReadDtoPagingResponseDto) {
  if (!result) return [];
  return result.map(({ id, firstName, lastName }) => ({
    id,
    name: `${firstName} ${lastName}`
  }));
}

const data = [
  {
    name: 'Germany',
    series: [
      {
        name: '1990',
        value: 62000000
      },
      {
        name: '2010',
        value: 73000000
      },
      {
        name: '2011',
        value: 89400000
      }
    ]
  },

  {
    name: 'USA',
    series: [
      {
        name: '1990',
        value: 250000000
      },
      {
        name: '2010',
        value: 309000000
      },
      {
        name: '2011',
        value: 311000000
      }
    ]
  },

  {
    name: 'France',
    series: [
      {
        name: '1990',
        value: 58000000
      },
      {
        name: '2010',
        value: 50000020
      },
      {
        name: '2011',
        value: 58000000
      }
    ]
  },
  {
    name: 'UK',
    series: [
      {
        name: '1990',
        value: 57000000
      },
      {
        name: '2010',
        value: 62000000
      },
      {
        name: '2011',
        value: 72000000
      }
    ]
  }
];

@Component({
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPage {
  approvedCars$ = this.store.select(CarState.approvedCars).pipe(
    hasValue(),
    map(({ result }) => result?.map(({ createdAt, name }) => ({ createdAt, name })))
  );
  managers$ = this.store.select(ManagerState.managers).pipe(hasValue(), map(toIdAndName));
  staffs$ = this.store.select(StaffState.staffs).pipe(hasValue(), map(toIdAndName));

  readonly value = [
    [1, 50] as const,
    [2, 75] as const,
    [3, 50] as const,
    [4, 150] as const,
    [5, 155] as const,
    [6, 190] as const,
    [7, 90] as const
  ];

  multi = [
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    ...data,
    ...data
  ];
  view: [number, number] = [700, 300];

  // options
  legend = true;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  yAxisLabel = 'Year';

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor(private store: Store) {
    this.store.dispatch([new LoadApprovedCars(), new LoadManagers({}), new LoadStaffs({})]);
  }

  onSelect(data: string[]): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }
}
