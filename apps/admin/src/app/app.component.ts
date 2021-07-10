import { TuiDialogService, TuiNotification } from '@taiga-ui/core';
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
    private dialogService: TuiDialogService
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
        withLatestFrom(this.dialogService)
      )
      .subscribe(([, dialogService]) => {
        if (dialogService.length) {
          dialogService.forEach((observer) => observer.completeWith(0));
          this.store.dispatch(
            new ShowNotification({
              message: 'You are reconnected. Please refresh to make sure later processing work.',
              options: {
                label: 'Network connected',
                status: TuiNotification.Success
              }
            })
          );
        }
      });
    this.network.online$
      .pipe(filter((online) => !online))
      .subscribe(() =>
        this.dialogService
          .open(
            'You are offline. All actions will be discarded. \nPlease reconnect as soon as possible to continue.',
            { label: 'Network disconnected', closeable: false, dismissible: false, size: 'l' }
          )
          .subscribe()
      );
  }
}
