import { NgModule } from '@angular/core';
import { ViewProfilePage } from './view-profile.page';
import { ViewProfileComponentModule } from '@shared/features/manage-profile/ui';
import { IonicModule } from '@ionic/angular';
import { TuiButtonModule } from '@taiga-ui/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [ViewProfileComponentModule, IonicModule, TuiButtonModule, RouterModule],
  declarations: [ViewProfilePage],
  exports: [ViewProfilePage]
})
export class ViewProfileUiModule {}
