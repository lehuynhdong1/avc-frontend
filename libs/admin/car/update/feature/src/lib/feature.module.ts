import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UpdatePage } from '@admin/car/update/ui';
import { DataAccessModule as CarDataAccessModule } from '@shared/features/car/data-access';
import { DataAccessModule as ManagerDataAccessModule } from '@shared/features/manager/data-access';
import { UnsavedChangesGuard } from '@shared/util';

@NgModule({
  imports: [
    CarDataAccessModule,
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
export class FeatureModule {}
