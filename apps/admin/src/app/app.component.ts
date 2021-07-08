import { TuiNotification } from '@taiga-ui/core';
import { SignalRService, ReceivedMethods } from '@shared/util';
import { Component } from '@angular/core';
import { Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { LoadRoles, LoadToken, LoginState, Login } from '@shared/auth/login/data-access';
import { ShowNotification } from '@shared/util';
import { CarState, LoadCarById, LoadApprovedCars } from '@shared/features/car/data-access';
import { withLatestFrom } from 'rxjs/operators';
import {
  StartSignalR,
  WhenCarConnected,
  ConnectAccount,
  WhenCarDisconnected,
  WhenCarRunning,
  WhenCarStopping
} from '@shared/features/signalr/data-access';

@Component({
  selector: 'adca-root',
  template: '<tui-root class="h-100"><router-outlet></router-outlet></tui-root>'
})
export class AppComponent {
  constructor(store: Store, actions: Actions, signalr: SignalRService) {
    store.dispatch([new LoadToken(), new LoadRoles(), new StartSignalR()]);

    const whenStartSignalRSuccess$ = actions.pipe(ofActionSuccessful(StartSignalR));
    whenStartSignalRSuccess$.subscribe(() => {
      const whenLoginSuccess$ = actions.pipe(ofActionSuccessful(Login));
      whenLoginSuccess$.subscribe(() => {
        console.log('WhenLoginSuccess ConnectAccount run');

        const myId = store.selectSnapshot(LoginState.account)?.id;
        if (!myId) return;
        store.dispatch(new ConnectAccount(myId || 0));
      });

      const whenConnectAccountSuccess$ = actions.pipe(ofActionSuccessful(ConnectAccount));

      whenConnectAccountSuccess$.subscribe(() => {
        const myId = store.selectSnapshot(LoginState.account)?.id;
        if (!myId) return;
        signalr.unregister(ReceivedMethods.WhenCarConnected);
        signalr.register(ReceivedMethods.WhenCarConnected, (params) => {
          console.warn('ReceivedMethods.WhenCarConnected', params);
          if (params.accountIdList.includes(myId))
            store
              .dispatch([new LoadApprovedCars(), new LoadCarById({ id: params.carId })])

              .pipe(withLatestFrom(store.select(CarState.selectedCar)))
              .subscribe(([, car]) => {
                store.dispatch(
                  new ShowNotification({
                    message: `Car "${car?.name}" has been connected.`,
                    options: { label: 'Car Connected', status: TuiNotification.Success }
                  })
                );
              });
          // store.dispatch(new WhenCarConnected(params));
        });

        signalr.unregister(ReceivedMethods.WhenCarDisconnected);
        signalr.register(ReceivedMethods.WhenCarDisconnected, (params) => {
          console.warn('ReceivedMethods.WhenCarDisconnected', params);

          if (params.accountIdList.includes(myId)) {
            store
              .dispatch([new LoadApprovedCars(), new LoadCarById({ id: params.carId })])

              .pipe(withLatestFrom(store.select(CarState.selectedCar)))
              .subscribe(([, car]) => {
                store.dispatch(
                  new ShowNotification({
                    message: `Car "${car?.name}" has been disconnected.`,
                    options: { label: 'Car Disconnected', status: TuiNotification.Error }
                  })
                );
              });
          }
          // store.dispatch(new WhenCarDisconnected(params));
        });

        signalr.unregister(ReceivedMethods.WhenCarRunning);
        signalr.register(ReceivedMethods.WhenCarRunning, (params) => {
          console.warn('ReceivedMethods.WhenCarRunning', params);

          if (params.accountIdList.includes(myId)) {
            store
              .dispatch([new LoadApprovedCars(), new LoadCarById({ id: params.carId })])

              .pipe(withLatestFrom(store.select(CarState.selectedCar)))
              .subscribe(([, car]) => {
                store.dispatch(
                  new ShowNotification({
                    message: `Car "${car?.name}" has been running.`,
                    options: { label: 'Car Start Running', status: TuiNotification.Success }
                  })
                );
              });
          }
          // store.dispatch(new WhenCarRunning(params));
        });

        signalr.unregister(ReceivedMethods.WhenCarStopping);
        signalr.register(ReceivedMethods.WhenCarStopping, (params) => {
          console.warn('ReceivedMethods.WhenCarStopping', params);

          if (params.accountIdList.includes(myId)) {
            store
              .dispatch([new LoadApprovedCars(), new LoadCarById({ id: params.carId })])

              .pipe(withLatestFrom(store.select(CarState.selectedCar)))
              .subscribe(([, car]) => {
                store.dispatch(
                  new ShowNotification({
                    message: `Car "${car?.name}" has been stopped.`,
                    options: { label: 'Car Stopping', status: TuiNotification.Warning }
                  })
                );
              });
          }
          // store.dispatch(new WhenCarStopping(params));
        });
      });
    });
  }

  // private whenSignalRConnectSuccess() {
  //   const whenConnectAccountSuccess$ = this.actions.pipe(ofActionSuccessful(ConnectAccount));

  //   whenConnectAccountSuccess$.subscribe(() => {
  //     this.whenLoginSuccess();
  //   })
  // }
  // private whenLoginSuccess() {const whenLoginSuccess$ = this.actions.pipe(ofActionSuccessful(Login));
  //   whenLoginSuccess$.subscribe(() => {
  //     console.log('WhenLoginSuccess ConnectAccount run');

  //     const myId = this.store.selectSnapshot(LoginState.account)?.id;
  //     if (!myId) return;
  //     this.store.dispatch(new ConnectAccount(myId || 0));
  //   });}

  //   private unregisterAll() {
  //     this.signalr.unregister(ReceivedMethods.WhenCarConnected);
  //     this.signalr.unregister(ReceivedMethods.WhenCarDisconnected);
  //     this.signalr.unregister(ReceivedMethods.WhenCarRunning);
  //     this.signalr.unregister(ReceivedMethods.WhenCarStopping);

  //   }
}
