import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HandleErrorInterceptor } from './interceptors';
import { IsLoggedInGuard } from './guards/is-logged-in.guard';
import { IsNotLoggedInGuard } from './guards/is-not-logged-in.guard';

@NgModule({
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HandleErrorInterceptor, multi: true },
    IsLoggedInGuard,
    IsNotLoggedInGuard
  ]
})
export class UtilModule {}
