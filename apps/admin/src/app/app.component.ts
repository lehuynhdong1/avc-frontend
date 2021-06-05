import { Component, OnInit } from '@angular/core';
import { AutoTitleService } from '@shared/util';
import { Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { Router } from '@angular/router';
import { Logout } from '../../../../libs/shared/auth/logout/data-access/src/lib/store/logout.actions';
import { StateReset } from 'ngxs-reset-plugin';
import { LoginState } from '../../../../libs/shared/auth/login/data-access/src/lib/store/login.state';

@Component({
  selector: 'adca-root',
  template: '<tui-root class="h-100"><router-outlet></router-outlet> </tui-root>'
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store,
    private actions: Actions,
    private router: Router,
    private autoTitle: AutoTitleService
  ) {}
  ngOnInit(): void {
    this.autoTitle.setupAutoTitleListener({ postfix: ' | AVC' });
  }

  registerLogout(): void {
    this.actions.pipe(ofActionSuccessful(Logout)).subscribe(() => {
      this.store.dispatch(new StateReset(LoginState));
      this.router.navigateByUrl('/login');
    });
  }
}
