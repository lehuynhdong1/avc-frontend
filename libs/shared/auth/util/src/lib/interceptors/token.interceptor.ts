import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { ShowNotification } from '../store/util.actions';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private _store: Store) {}
  intercept(
    request: HttpRequest<Record<string, string>>,
    next: HttpHandler
  ): Observable<HttpEvent<Record<string, string>>> {
    return next.handle(request).pipe(
      catchError((error: HttpResponse<Record<string, string>>) => {
        if (error.status === 401) {
          this._store.dispatch(
            new ShowNotification({
              message: 'Unauthorize access. Please login again!',
              options: {
                label: 'Unauthorize access'
              }
            })
          );
        }
        return of(error);
      })
    );
  }
}
