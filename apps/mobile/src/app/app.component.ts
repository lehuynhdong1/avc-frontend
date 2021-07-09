import { SignalRService } from '@shared/util';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { LoadRoles, LoadToken, LoginState, Login } from '@shared/auth/login/data-access';
import { Logout } from '@shared/auth/logout/data-access';
import {
  StartSignalR,
  ConnectAccount,
  StopSignalR,
  RegisterAllListeners
} from '@shared/features/signalr/data-access';

@Component({
  selector: 'adcm-root',
  template: '<ion-app><tui-root class="h-100"><router-outlet></router-outlet></tui-root></ion-app>',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(private store: Store, private actions: Actions, private signalr: SignalRService) {
    store.dispatch([new LoadToken(), new LoadRoles()]);

    this.whenLoginSuccess();
    this.whenLogoutSuccess();
    this.whenStartSignalRSuccess();
    this.whenConnectAccountSuccess();
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
      this.store.dispatch(new RegisterAllListeners());
    });
  }
}
