import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { Store } from '@ngxs/store';
import { LoginState } from '@shared/auth/login/data-access';

@Injectable()
export class IsLoggedInGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, private _store: Store) {}

  async canActivate() {
    return this.isLogined();
  }

  async canActivateChild() {
    return this.isLogined();
  }

  isLogined() {
    const isLogined = !!this._store.selectSnapshot(LoginState.token);
    if (!isLogined) {
      this.router.navigateByUrl('/login');
    }
    return isLogined;
  }
}
