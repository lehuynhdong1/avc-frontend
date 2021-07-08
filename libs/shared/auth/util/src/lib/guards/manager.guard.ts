import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store } from '@ngxs/store';
import { LoginState } from '@shared/auth/login/data-access';

@Injectable()
export class ManagerGuard implements CanActivate {
  constructor(private router: Router, private _store: Store) {}

  async canActivate(): Promise<boolean> {
    const isManager = this._store.selectSnapshot(LoginState.account)?.role === 'Manager';
    if (!isManager) return this.router.navigateByUrl('/');
    return isManager;
  }
}
