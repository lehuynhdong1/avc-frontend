import { NgModule } from '@angular/core';
import { ViewProfilePage } from './view-profile.page';
import { ViewProfileComponentModule } from '@shared/features/manage-profile/ui';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [ViewProfileComponentModule, IonicModule],
  declarations: [ViewProfilePage],
  exports: [ViewProfilePage]
})
export class ViewProfileUiModule {}
