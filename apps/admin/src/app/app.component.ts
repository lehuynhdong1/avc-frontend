import { TuiNotification } from '@taiga-ui/core';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Store, Actions, ofActionSuccessful, ofActionErrored } from '@ngxs/store';
import { LoadRoles, LoadToken, LoginState, Login } from '@shared/auth/login/data-access';
import { Logout } from '@shared/auth/logout/data-access';
import { hasValue, LoadUnreadCount, NetworkService, ShowNotification } from '@shared/util';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
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
import { Router } from '@angular/router';

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
    private alertCtrl: AlertController,
    private router: Router
  ) {
    store.dispatch([new LoadToken(), new LoadRoles()]);

    this.whenNetworkChanged();
    this.whenLoginSuccess();
    this.whenLogoutSuccess();
    this.whenStartSignalRSuccess();
    this.whenRegisterAllListenersSuccess();

    this.whenCarNotify();
    this.whenBeDeactivated();
    const myId = store.selectSnapshot(LoginState.account)?.id;
    // if (myId) store.dispatch(new StartSignalR());
  }

  private whenLoginSuccess() {
    this.actions
      .pipe<Login>(ofActionSuccessful(Login))
      .subscribe(() => this.store.dispatch(new StartSignalR()));
  }

  private whenLogoutSuccess(): void {
    this.actions.pipe<Logout>(ofActionSuccessful(Logout)).subscribe(() => {
      this.store.dispatch(new StopSignalR());
      this.router.navigateByUrl('/login');
    });
  }

  private whenStartSignalRSuccess() {
    this.actions
      .pipe<StartSignalR>(ofActionSuccessful(StartSignalR))
      .pipe(
        withLatestFrom(
          this.store
            .select(LoginState.account)
            .pipe(map((account) => account?.id))
            .pipe(hasValue())
        ),
        switchMap(([, myId]) => this.store.dispatch(new ConnectAccount(myId))),
        switchMap(() => this.store.dispatch(new UnregisterAllListeners())),
        switchMap(() => this.store.dispatch(new RegisterAllListeners()))
      )
      .subscribe();
    this.actions.pipe<StartSignalR>(ofActionErrored(StartSignalR)).subscribe(() =>
      this.store.dispatch([
        new ShowNotification({
          message:
            'Realtime server has been maintained. Sorry for inconvenience, we will automatically reconnect ASAP.',
          options: {
            label: 'Realtime Connection',
            status: TuiNotification.Warning
          }
        })
      ])
    );
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
    const messageMapper = {
      WhenAdminChangeCarManagedBy: {
        options: {
          label: 'Managed Cars Updated',
          status: TuiNotification.Warning
        }
      },
      WhenAdminChangeStaffManagedBy: {
        options: {
          label: 'Managed Staffs Updated',
          status: TuiNotification.Warning
        }
      },
      WhenManagerChangeAssignedCar: {
        options: {
          label: 'Assigned Cars Updated',
          status: TuiNotification.Warning
        }
      },
      WhenStaffDeactivated: {
        options: {
          label: 'Staff Was Deactivated',
          status: TuiNotification.Warning
        }
      },
      WhenManagerDeactivated: {
        options: {
          label: 'Your Manager Was Deactivated',
          status: TuiNotification.Warning
        }
      },
      WhenCarDeactivated: {
        options: {
          label: 'Your Car Was Deactivated',
          status: TuiNotification.Warning
        }
      },
      WhenIssueCreated: {
        options: {
          label: 'New Car Issue',
          status: TuiNotification.Warning
        }
      },
      WhenModelStatusChanged: {
        options: {
          label: 'Training Result',
          status: TuiNotification.Warning
        }
      }
    };

    type WhenOtherNotify =
      | 'WhenAdminChangeCarManagedBy'
      | 'WhenAdminChangeStaffManagedBy'
      | 'WhenManagerChangeAssignedCar'
      | 'WhenStaffDeactivated'
      | 'WhenManagerDeactivated'
      | 'WhenCarDeactivated'
      | 'WhenIssueCreated'
      | 'WhenModelStatusChanged';

    // Merge all to archive only 1 subscription for notification
    merge(
      ...Object.keys(messageMapper).map((key) => {
        const typedKey = key as WhenOtherNotify;
        return this.store.select(SignalRState.get(typedKey)).pipe(
          hasValue(),
          map(({ message }) => ({ message, ...messageMapper[typedKey] }))
        );
      })
    ).subscribe((params) => {
      const me = this.store.selectSnapshot(LoginState.account);
      this.store.dispatch([
        new ShowNotification(params),
        new LoadUnreadCount({ receiverId: me?.id || 0 })
      ]);
    });
    this.store
      .select(SignalRState.get('WhenNewCarRegistered'))
      .pipe(hasValue())
      .subscribe((message) => {
        const me = this.store.selectSnapshot(LoginState.account);
        this.store.dispatch([
          new ShowNotification({
            message,
            options: {
              label: 'New Car Request',
              status: TuiNotification.Info
            }
          }),
          new LoadUnreadCount({ receiverId: me?.id || 0 })
        ]);
      });
  }

  private whenCarNotify() {
    const messageMapper = {
      WhenCarConnected: {
        message: 'Just a moment, a new car has been connected. Check it out!',
        options: {
          label: 'Car Connected',
          status: TuiNotification.Success
        }
      },
      WhenCarDisconnected: {
        message: 'Just a moment, a new car has been disconnected.',
        options: {
          label: 'Car Disconnected',
          status: TuiNotification.Error
        }
      },
      WhenCarRunning: {
        message: 'Your new car has been started.',
        options: {
          label: 'Car Started',
          status: TuiNotification.Success
        }
      },
      WhenCarStopping: {
        message: 'Your new car has been stopped.',
        options: {
          label: 'Car Stopped',
          status: TuiNotification.Warning
        }
      }
    };
    type WhenCarNotify =
      | 'WhenCarConnected'
      | 'WhenCarDisconnected'
      | 'WhenCarRunning'
      | 'WhenCarStopping';

    // Merge all to archive only 1 subscription for notification
    merge(
      ...Object.keys(messageMapper).map((key) => {
        const typedKey = key as WhenCarNotify;
        return this.store.select(SignalRState.get(typedKey)).pipe(
          hasValue(),
          map(() => messageMapper[typedKey])
        );
      })
    ).subscribe((params) => {
      const me = this.store.selectSnapshot(LoginState.account);
      this.store.dispatch([
        new ShowNotification(params),
        new LoadUnreadCount({ receiverId: me?.id || 0 })
      ]);
    });
  }

  private whenBeDeactivated() {
    this.store
      .select(SignalRState.get('WhenThisAccountDeactivated'))
      .pipe(hasValue())
      .subscribe(() =>
        this.store.dispatch([
          new ShowNotification({
            message: 'You have been deactivated. Contact the admin for reactivation.',
            options: {
              label: 'Account Deactivated',
              status: TuiNotification.Success
            }
          }),
          new Logout()
        ])
      );
  }
}
