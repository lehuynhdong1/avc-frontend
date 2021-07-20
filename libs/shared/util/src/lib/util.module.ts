import { ModuleWithProviders, NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { UtilState } from './store/util.state';
import { TuiNotificationsModule } from '@taiga-ui/core';
import { UserNotificationsService } from '@shared/api';

@NgModule({
  imports: [TuiNotificationsModule, NgxsModule.forFeature([UtilState])]
})
export class UtilModule {
  static forRoot(): ModuleWithProviders<UtilModule> {
    return {
      ngModule: UtilModule,
      providers: [UserNotificationsService]
    };
  }
}
