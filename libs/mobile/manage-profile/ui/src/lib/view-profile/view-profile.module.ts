import { NgModule } from '@angular/core';
import { ViewProfilePage } from './view-profile.page';
import { ViewProfileComponentModule } from '@shared/features/manage-profile/ui';
import { IonicModule } from '@ionic/angular';
import { TuiButtonModule } from '@taiga-ui/core';

@NgModule({
  imports: [ViewProfileComponentModule, IonicModule, TuiButtonModule],
  declarations: [ViewProfilePage],
  exports: [ViewProfilePage]
})
export class ViewProfileUiModule {}
