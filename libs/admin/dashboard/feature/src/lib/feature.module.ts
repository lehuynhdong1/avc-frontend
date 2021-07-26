import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardPage } from '@admin/dashboard/ui';
import { DataAccessModule } from '@admin/dashboard/data-access';
import { DataAccessModule as IssueDataAccessModule } from '@shared/features/issue/data-access';

@NgModule({
  imports: [
    DataAccessModule,
    IssueDataAccessModule,
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
