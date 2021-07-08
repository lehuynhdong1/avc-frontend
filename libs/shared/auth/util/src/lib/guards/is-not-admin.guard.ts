import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngxs/store';
import { LoginState } from '@shared/auth/login/data-access';

@Injectable()
export class NotAdminGuard implements CanActivate {
  constructor(private _store: Store) {}

  async canActivate(): Promise<boolean> {
    const isAdmin = this._store.selectSnapshot(LoginState.account)?.role === 'Admin';
    return !isAdmin;
  }
}
