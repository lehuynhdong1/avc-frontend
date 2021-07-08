import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UpdatePage } from '@shared/features/car/ui';
import { DataAccessModule as CarDataAccessModule } from '@shared/features/car/data-access';
import { DataAccessModule as StaffDataAccessModule } from '@shared/features/staff/data-access';
import { DataAccessModule as ManagerDataAccessModule } from '@shared/features/manager/data-access';
import { UnsavedChangesGuard } from '@shared/util';

@NgModule({
  imports: [
    CarDataAccessModule,
    StaffDataAccessModule,
    ManagerDataAccessModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: UpdatePage,
        data: { title: 'Update Car' },
        canDeactivate: [UnsavedChangesGuard]
      }
    ])
  ],
  providers: [UnsavedChangesGuard]
})
export class UpdateModule {}
