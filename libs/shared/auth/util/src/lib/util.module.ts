import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HandleErrorInterceptor } from './interceptors';
import { IsLoggedInGuard, IsNotLoggedInGuard, AdminGuard, ManagerGuard } from './guards';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HandleErrorInterceptor, multi: true },
    ManagerGuard,
    IsLoggedInGuard,
    IsNotLoggedInGuard,
    AdminGuard
  ]
})
export class UtilModule {}
