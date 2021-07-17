import { TuiNotification } from '@taiga-ui/core';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { LoadRoles, LoadToken, LoginState, Login } from '@shared/auth/login/data-access';
import { Logout } from '@shared/auth/logout/data-access';
import { hasValue, NetworkService, ShowNotification } from '@shared/util';
import { filter, switchMap } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';
import {
  StartSignalR,
  ConnectAccount,
  StopSignalR,
  RegisterAllListeners,
  UnregisterAllListeners,
  SignalRState
} from '@shared/features/signalr/data-access';
import { defer, from, merge } from 'rxjs';

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
    this.whenRegisterAllListenersSuccess();

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

  private whenRegisterAllListenersSuccess() {
    const whenCarConnected$ = this.store.select(SignalRState.get('WhenCarConnected'));
    const whenCarDisconnected$ = this.store.select(SignalRState.get('WhenCarDisconnected'));
    const whenCarRunning$ = this.store.select(SignalRState.get('WhenCarRunning'));
    const whenCarStopping$ = this.store.select(SignalRState.get('WhenCarStopping'));

    const whenAdminChangeCarManagedBy$ = this.store.select(
      SignalRState.get('WhenAdminChangeCarManagedBy')
    );
    const whenAdminChangeStaffManagedBy$ = this.store.select(
      SignalRState.get('WhenAdminChangeStaffManagedBy')
    );
    const whenManagerChangeAssignedCar$ = this.store.select(
      SignalRState.get('WhenManagerChangeAssignedCar')
    );
    const whenStaffDeactivated$ = this.store.select(SignalRState.get('WhenStaffDeactivated'));
    const whenManagerDeactivated$ = this.store.select(SignalRState.get('WhenManagerDeactivated'));
    const whenThisAccountDeactivated$ = this.store.select(
      SignalRState.get('WhenThisAccountDeactivated')
    );
    const whenCarDeactivated$ = this.store.select(SignalRState.get('WhenCarDeactivated'));
    const whenIssueCreated$ = this.store.select(SignalRState.get('WhenIssueCreated'));
    const whenModelStatusChanged$ = this.store.select(SignalRState.get('WhenModelStatusChanged'));

    // const carNotifications$ = merge(whenCarConnected$, whenCarDisconnected$,whenCarRunning$, whenCarStopping$);
    // TODO: Special b/c no message in response whenThisAccountDeactivated$,
    const notifications$ = merge(
      whenAdminChangeCarManagedBy$,
      whenAdminChangeStaffManagedBy$,
      whenManagerChangeAssignedCar$,
      whenStaffDeactivated$,
      whenManagerDeactivated$,
      whenCarDeactivated$,
      whenIssueCreated$,
      whenModelStatusChanged$
    );

    this.actions
      .pipe<RegisterAllListeners>(ofActionSuccessful(RegisterAllListeners))
      .pipe(switchMap(() => notifications$.pipe(hasValue())))
      .subscribe(({ message }: any) => {
        console.log('====================== notifications registered');

        this.store.dispatch(
          new ShowNotification({
            message,
            options: {
              label: 'Message coming',
              status: TuiNotification.Success
            }
          })
        );
      });
  }
}
