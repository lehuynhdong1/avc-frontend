import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {} from '@angular/common';
import { UiModule, ApprovePage } from '@admin/car/approve/ui';
import { DataAccessModule as CarDataAccessModule } from '@shared/features/car/data-access';
import { DataAccessModule as ManagerDataAccessModule } from '@shared/features/manager/data-access';
import { UnsavedChangesGuard } from '@admin/core/util';

@NgModule({
  imports: [
    UiModule,
    CarDataAccessModule,
    ManagerDataAccessModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ApprovePage, canDeactivate: [UnsavedChangesGuard] }
    ])
  ],
  providers: [UnsavedChangesGuard]
})
export class FeatureModule {}
