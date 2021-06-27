import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreatePage } from '@admin/staff/create/ui';
import { DataAccessModule as StaffDataAccessModule } from '@shared/features/staff/data-access';
import { DataAccessModule as ManagerDataAccessModule } from '@shared/features/manager/data-access';
import { UnsavedChangesGuard } from '@admin/core/util';

@NgModule({
  imports: [
    StaffDataAccessModule,
    ManagerDataAccessModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: CreatePage,
        data: { title: 'Create New Staff' },
        canDeactivate: [UnsavedChangesGuard]
      }
    ])
  ],
  providers: [UnsavedChangesGuard]
})
export class FeatureModule {}
