import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { UtilState } from './store/util.state';
import { TuiNotificationsModule, TuiNotificationsService } from '@taiga-ui/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from './interceptors';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';
import { IsNotLoggedInGuard } from './guards/is-not-logged-in.guard';

@NgModule({
  imports: [HttpClientModule, NgxsModule.forFeature([UtilState]), TuiNotificationsModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    TuiNotificationsService,
    IsLoggedInGuard,
    IsNotLoggedInGuard
  ]
})
export class UtilModule {}
