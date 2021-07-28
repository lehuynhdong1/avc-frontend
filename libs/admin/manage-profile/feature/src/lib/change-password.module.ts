import { NgModule } from '@angular/core';
import { DataAccessModule } from '@shared/features/manage-profile/data-access';
import { ChangePasswordUiModule } from '@admin/manage-profile/ui';

@NgModule({
  imports: [DataAccessModule, ChangePasswordUiModule]
})
export class ChangePasswordModule {}
