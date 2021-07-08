import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { Store } from '@ngxs/store';
import { LoginState } from '@shared/auth/login/data-access';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private _store: Store) {}

  async canActivate(): Promise<boolean> {
    const isAdmin = this._store.selectSnapshot(LoginState.account)?.role === 'Admin';
    console.log('=============isAdmin=', isAdmin);
    if (!isAdmin) return this.router.navigateByUrl('/car');
    return isAdmin;
  }
}
