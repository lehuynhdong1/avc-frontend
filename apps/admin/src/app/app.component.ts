import { TuiNotification } from '@taiga-ui/core';
import { SignalRService, ReceivedMethods } from '@shared/util';
import { Component } from '@angular/core';
import { Store, Actions, ofActionSuccessful } from '@ngxs/store';
import { LoadRoles, LoadToken, LoginState } from '@shared/auth/login/data-access';
import { ShowNotification } from '@shared/util';
import { CarState, LoadCarById } from '@shared/features/car/data-access';
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
    const myId = store.selectSnapshot(LoginState.account)?.id;
    if (!myId) return;
    store.dispatch([new LoadToken(), new LoadRoles(), new StartSignalR()]);
    actions.pipe(ofActionSuccessful(StartSignalR)).subscribe(() => {
      store.dispatch(new ConnectAccount(myId || 0));
    });

    signalr.register(ReceivedMethods.WhenCarConnected, (params) => {
      console.warn('ReceivedMethods.WhenCarConnected', params);
      if (params.accountIdList.includes(myId))
        store
          .dispatch(new LoadCarById({ id: params.carId }))
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
    signalr.register(ReceivedMethods.WhenCarDisconnected, (params) => {
      console.warn('ReceivedMethods.WhenCarDisconnected', params);

      if (params.accountIdList.includes(myId)) {
        store
          .dispatch(new LoadCarById({ id: params.carId }))
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

    signalr.register(ReceivedMethods.WhenCarRunning, (params) => {
      console.warn('ReceivedMethods.WhenCarRunning', params);

      if (params.accountIdList.includes(myId)) {
        store
          .dispatch(new LoadCarById({ id: params.carId }))
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

    signalr.register(ReceivedMethods.WhenCarStopping, (params) => {
      console.warn('ReceivedMethods.WhenCarStopping', params);

      if (params.accountIdList.includes(myId)) {
        store
          .dispatch(new LoadCarById({ id: params.carId }))
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
  }
}
