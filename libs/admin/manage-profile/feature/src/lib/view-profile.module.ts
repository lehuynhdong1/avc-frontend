import { ChangePasswordModule } from './change-password.module';
import { NgModule } from '@angular/core';
import { ViewProfileUiModule } from '@admin/manage-profile/ui';
import { DataAccessModule } from '@shared/features/manage-profile/data-access';

@NgModule({
  imports: [ViewProfileUiModule, DataAccessModule, ChangePasswordModule]
})
export class ViewProfileModule {}
