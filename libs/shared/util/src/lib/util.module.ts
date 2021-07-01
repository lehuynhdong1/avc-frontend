import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { UtilState } from './store/util.state';
import { TuiNotificationsModule } from '@taiga-ui/core';
import { DataUrlPipe } from './pipes/data-url.pipe';

@NgModule({
  imports: [TuiNotificationsModule, NgxsModule.forFeature([UtilState])],
  declarations: [DataUrlPipe],
  exports: [DataUrlPipe]
})
export class UtilModule {}
