import { NgModule } from '@angular/core';
import { ViewProfilePage } from './view-profile.page';
import { TuiSvgModule } from '@taiga-ui/core';
import { ViewProfileComponentModule } from '@shared/features/manage-profile/ui';

const tuiModules = [TuiSvgModule];

@NgModule({
  imports: [ViewProfileComponentModule, tuiModules],
  declarations: [ViewProfilePage],
  exports: [ViewProfilePage]
})
export class ViewProfileUiModule {}
