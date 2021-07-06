import { NgModule } from '@angular/core';
import { ChangePasswordPage } from './change-password.page';
import { ChangePasswordComponentModule } from '@shared/features/manage-profile/ui';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [ChangePasswordPage],
  imports: [ChangePasswordComponentModule, IonicModule],
  exports: [ChangePasswordPage]
})
export class ChangePasswordUiModule {}
