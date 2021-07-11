import { TuiNotification } from '@taiga-ui/core';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { LoadRoles, LoadToken, LoginState, Login } from '@shared/auth/login/data-access';
import { Logout } from '@shared/auth/logout/data-access';
import { NetworkService, ShowNotification } from '@shared/util';
import { filter, switchMap } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import {
  StartSignalR,
  ConnectAccount,
  StopSignalR,
  RegisterAllListeners,
  UnregisterAllListeners
} from '@shared/features/signalr/data-access';
import { defer, from } from 'rxjs';

@Component({
  selector: 'adcm-root',
  template: '<ion-app><tui-root class="h-100"><router-outlet></router-outlet></tui-root></ion-app>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(
    private store: Store,
    private actions: Actions,
    private network: NetworkService,
    private alertCtrl: AlertController
  ) {
    store.dispatch([new LoadToken(), new LoadRoles()]);

    this.whenNetworkChanged();
    this.whenLoginSuccess();
    this.whenLogoutSuccess();
    this.whenStartSignalRSuccess();
    this.whenConnectAccountSuccess();
    this.whenUnregisterAllListenersSuccess();
    const myId = store.selectSnapshot(LoginState.account)?.id;
    if (myId) store.dispatch(new StartSignalR());
  }

  private whenLoginSuccess() {
    this.actions
      .pipe<Login>(ofActionSuccessful(Login))
      .subscribe(() => this.store.dispatch(new StartSignalR()));
  }

  private whenLogoutSuccess(): void {
    this.actions.pipe<Logout>(ofActionSuccessful(Logout)).subscribe(() => {
      this.store.dispatch(new StopSignalR());
    });
  }

  private whenStartSignalRSuccess() {
    this.actions.pipe<StartSignalR>(ofActionSuccessful(StartSignalR)).subscribe(() => {
      const myId = this.store.selectSnapshot(LoginState.account)?.id;
      if (!myId) throw new Error("Start SignalR Successful but hasn't logged in");
      this.store.dispatch(new ConnectAccount(myId || 0));
    });
  }

  private whenConnectAccountSuccess() {
    this.actions.pipe<ConnectAccount>(ofActionSuccessful(ConnectAccount)).subscribe(() => {
      this.store.dispatch(new UnregisterAllListeners());
    });
  }

  private whenUnregisterAllListenersSuccess() {
    this.actions
      .pipe<UnregisterAllListeners>(ofActionSuccessful(UnregisterAllListeners))
      .subscribe(() => {
        this.store.dispatch(new RegisterAllListeners());
      });
  }

  private whenNetworkChanged() {
    this.network.registerListeners();
    this.network.online$
      .pipe(
        filter((online) => online),
        switchMap(() => defer(() => from(this.alertCtrl.getTop()))),
        filter((topAlert) => !!topAlert)
      )
      .subscribe(() => {
        this.alertCtrl.dismiss();
        this.store.dispatch(
          new ShowNotification({
            message: 'You are reconnected. Please refresh to make sure later processing work.',
            options: {
              label: 'Network connected',
              status: TuiNotification.Success
            }
          })
        );
      });
    this.network.online$.pipe(filter((online) => !online)).subscribe(async () => {
      const alert = await this.alertCtrl.create({
        message:
          'You are offline. All actions will be discarded. \nPlease reconnect as soon as possible to continue.',
        backdropDismiss: false,
        header: 'Network disconnected',
        keyboardClose: true
      });
      alert.present();
    });
  }
}
