import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardPage } from '@admin/dashboard/ui';
import { DataAccessModule as IssueDataAccessModule } from '@shared/features/issue/data-access';
import { DataAccessModule as StaffDataAccessModule } from '@shared/features/staff/data-access';
import { DataAccessModule as ManagerDataAccessModule } from '@shared/features/manager/data-access';
import { DataAccessModule as CarDataAccessModule } from '@shared/features/car/data-access';

@NgModule({
  imports: [
    IssueDataAccessModule,
    StaffDataAccessModule,
    ManagerDataAccessModule,
    CarDataAccessModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: DashboardPage,
        data: { title: 'Dashboard' }
      }
    ])
  ]
})
export class FeatureModule {}
