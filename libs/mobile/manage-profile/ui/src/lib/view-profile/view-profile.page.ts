import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Actions, Store, ofActionSuccessful } from '@ngxs/store';
import { Logout } from '@shared/auth/logout/data-access';
import { defer, Subject } from 'rxjs';
import { Empty } from '@shared/util';
import { RxState } from '@rx-angular/state';
import { filter, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [RxState]
})
export class ViewProfilePage {
  readonly clickLogout$ = new Subject<void>();

  constructor(
    private store: Store,
    private actions: Actions,
    private state: RxState<Empty>,
    private router: Router,
    private alertCtrl: AlertController
  ) {
    this.logoutEffects();
  }

  private logoutEffects() {
    const whenLogoutSuccessful$ = this.actions.pipe(ofActionSuccessful(Logout));
    this.state.hold(whenLogoutSuccessful$, () => {
      this.router.navigateByUrl('/login');
    });
    const openAlert$ = defer(() =>
      this.alertCtrl
        .create({
          cssClass: 'my-custom-class',
          header: 'Log out',
          message: 'Do you really want to log out?',
          buttons: [
            {
              cssClass: 'text-red-500',
              role: 'logout',
              text: 'Logout'
            },
            {
              role: 'cancel',
              text: 'Cancel'
            }
          ]
        })
        .then((alert) => {
          alert.present();
          return alert.onDidDismiss<{
            role: string;
          }>();
        })
    );
    const whenClickLogout$ = this.clickLogout$.pipe(
      switchMap(() => openAlert$),
      filter((response) => response.role === 'logout')
    );
    this.state.hold(whenClickLogout$, () => {
      this.store.dispatch(new Logout());
    });
  }
}
