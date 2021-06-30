import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataAccessModule as ManagerDataAccessModule } from '@shared/features/manager/data-access';
import { UpdatePage, UiModule } from '@admin/manager/update/ui';
import { UnsavedChangesGuard } from '@admin/core/util';

@NgModule({
  imports: [
    ManagerDataAccessModule,
    UiModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: UpdatePage,
        data: { title: 'Update Manager' },
        canDeactivate: [UnsavedChangesGuard]
      }
    ])
  ],
  providers: [UnsavedChangesGuard]
})
export class FeatureModule {}
