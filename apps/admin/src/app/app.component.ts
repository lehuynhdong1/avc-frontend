import { TuiNotification, TuiNotificationsService } from '@taiga-ui/core';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { LoadRoles, LoadToken, LoginState, Login } from '@shared/auth/login/data-access';
import { Logout } from '@shared/auth/logout/data-access';
import { NetworkService, ShowNotification } from '@shared/util';
import { filter, withLatestFrom } from 'rxjs/operators';
import {
  StartSignalR,
  ConnectAccount,
  StopSignalR,
  RegisterAllListeners,
  UnregisterAllListeners
} from '@shared/features/signalr/data-access';

@Component({
  selector: 'adca-root',
  template: '<tui-root class="h-100"><router-outlet></router-outlet></tui-root>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(
    private store: Store,
    private actions: Actions,
    private network: NetworkService,
    private notifyService: TuiNotificationsService
  ) {
    store.dispatch([new LoadToken(), new LoadRoles()]);

    this.whenNetworkOffline();
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
  private whenNetworkOffline() {
    this.network.registerListeners();
    this.network.online$
      .pipe(
        filter((online) => online),
        withLatestFrom(this.notifyService.items$)
      )
      .subscribe(([, items]) => {
        const length = items.length;

        items.forEach((item) => item.observer.complete());
        if (length > 0)
          this.store.dispatch(
            new ShowNotification({
              message: 'You are reconnected. Please refresh your site to continue.',
              options: {
                label: 'Network connected',
                status: TuiNotification.Success,
                hasCloseButton: false,
                autoClose: false
              }
            })
          );
      });
    this.network.online$.pipe(filter((online) => !online)).subscribe(() =>
      this.store.dispatch(
        new ShowNotification({
          message:
            'You are offline. All actions will be discarded. Please reconnect as soon as possible.',
          options: {
            label: 'Network disconnected',
            status: TuiNotification.Error,
            hasCloseButton: false,
            autoClose: false
          }
        })
      )
    );
  }
}
