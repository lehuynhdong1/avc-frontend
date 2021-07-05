import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreatePage } from '@admin/manager/create/ui';
import { DataAccessModule as ManagerDataAccessModule } from '@shared/features/manager/data-access';
import { UnsavedChangesGuard } from '@shared/util';

@NgModule({
  imports: [
    ManagerDataAccessModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: CreatePage,
        data: { title: 'Create New Manager' },
        canDeactivate: [UnsavedChangesGuard]
      }
    ])
  ],
  providers: [UnsavedChangesGuard]
})
export class FeatureModule {}
