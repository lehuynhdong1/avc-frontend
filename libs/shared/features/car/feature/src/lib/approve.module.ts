import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ApproveUiModule, ApprovePage } from '@shared/features/car/ui';
import { DataAccessModule as CarDataAccessModule } from '@shared/features/car/data-access';
import { DataAccessModule as ManagerDataAccessModule } from '@shared/features/manager/data-access';
import { UnsavedChangesGuard } from '@shared/util';

@NgModule({
  imports: [
    ApproveUiModule,
    CarDataAccessModule,
    ManagerDataAccessModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ApprovePage, canDeactivate: [UnsavedChangesGuard] }
    ])
  ],
  providers: [UnsavedChangesGuard]
})
export class ApproveModule {}
