import { NgModule } from '@angular/core';
import { ViewProfilePage } from './view-profile.page';
import { TuiSvgModule } from '@taiga-ui/core';
import {
  ViewProfileComponentModule,
  ChangePasswordComponentModule
} from '@shared/features/manage-profile/ui';

const tuiModules = [TuiSvgModule];

@NgModule({
  imports: [ViewProfileComponentModule, tuiModules, ChangePasswordComponentModule],
  declarations: [ViewProfilePage],
  exports: [ViewProfilePage]
})
export class ViewProfileUiModule {}
