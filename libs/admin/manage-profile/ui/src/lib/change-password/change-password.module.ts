import { NgModule } from '@angular/core';
import { ChangePasswordPage } from './change-password.page';
import { TuiSvgModule } from '@taiga-ui/core';
import { ChangePasswordComponentModule } from '@shared/features/manage-profile/ui';

const tuiModules = [TuiSvgModule];
@NgModule({
  declarations: [ChangePasswordPage],
  imports: [ChangePasswordComponentModule, tuiModules],
  exports: [ChangePasswordPage]
})
export class ChangePasswordUiModule {}
