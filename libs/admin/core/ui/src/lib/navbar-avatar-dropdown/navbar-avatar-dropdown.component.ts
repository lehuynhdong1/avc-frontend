import { ChangeDetectionStrategy, Component } from '@angular/core';
import { loader } from './transloco.loader';
import { TRANSLOCO_SCOPE } from '@ngneat/transloco';
import { Store, Select, Actions, ofActionSuccessful } from '@ngxs/store';
import { TuiAppearance } from '@taiga-ui/core';
import { filter, switchMap } from 'rxjs/operators';
import { Logout } from '@shared/auth/logout/data-access';
import { LoginState, LoginStateModel } from '@shared/auth/login/data-access';
import { Observable, Subject } from 'rxjs';
import { ConfirmDialogComponentParams } from '../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';
import { RxState } from '@rx-angular/state';
import { ConfirmDialogService } from '../confirm-dialog/confirm-dialog.service';

const confirmDialogParams: ConfirmDialogComponentParams = {
  content: 'Do you really want to log out?',
  buttons: [
    {
      id: 1,
      label: 'Logout'
    },
    {
      id: 2,
      label: 'Cancel',
      uiOptions: {
        appearance: TuiAppearance.Outline
      }
    }
  ]
};
@Component({
  selector: 'adca-navbar-avatar-dropdown',
  templateUrl: './navbar-avatar-dropdown.component.html',
  styleUrls: ['./navbar-avatar-dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState, { provide: TRANSLOCO_SCOPE, useValue: { scope: 'navbar', loader } }]
})
export class NavbarAvatarDropdownComponent {
  @Select(LoginState.account) me$: Observable<LoginStateModel['account']>;
  readonly items = [
    {
      title: 'Profile',
      link: 'profile'
    }
  ];

  /* Actions */
  readonly clickLogout$ = new Subject();

  /* Side effects */
  private whenLogoutSuccessful$ = this.actions.pipe(ofActionSuccessful(Logout));
  private openConfirmDialog$ = this.confirmDialog.open('Log out confirmation', confirmDialogParams);
  private whenConfirmDialogOk$ = this.openConfirmDialog$.pipe(filter((response) => response === 1));
  private whenClickLogout$ = this.clickLogout$.pipe(switchMap(() => this.whenConfirmDialogOk$));

  constructor(
    private store: Store,
    private actions: Actions,
    private router: Router,
    private state: RxState<never>,
    private confirmDialog: ConfirmDialogService
  ) {
    this.declareSideEffects();
  }

  private declareSideEffects() {
    this.state.hold(this.whenLogoutSuccessful$, () => {
      this.router.navigateByUrl('/login');
    });
    this.state.hold(this.whenClickLogout$, () => {
      this.store.dispatch(new Logout());
    });
  }
}
