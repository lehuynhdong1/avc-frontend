import { State, Action, StateContext } from '@ngxs/store';
import { STATE_NAME, StateModel, INITIAL_STATE } from './state.model';
import { Injectable } from '@angular/core';
import { ReceivedMethods, SentMethods, SignalRService } from '@shared/util';
import {
  ConnectAccount,
  StartCar,
  StopCar,
  WhenCarConnected,
  WhenCarDisconnected,
  WhenCarRunning,
  WhenCarStopping,
  StartSignalR
} from './actions';

@State<StateModel>({
  name: STATE_NAME,
  defaults: INITIAL_STATE
})
@Injectable()
export class SignalRState {
  constructor(private signalr: SignalRService) {}

  @Action(StartSignalR, { cancelUncompleted: true }) StartSignalR() {
    return this.signalr.start();
  }

  @Action(ConnectAccount, { cancelUncompleted: true }) ConnectAccount(
    _: StateContext<StateModel>,
    { params }: ConnectAccount
  ) {
    return this.signalr.send(SentMethods.ConnectAccount, params);
  }
  @Action(StartCar, { cancelUncompleted: true }) StartCar(
    _: StateContext<StateModel>,
    { params }: StartCar
  ) {
    return this.signalr.send(SentMethods.StartCar, params);
  }

  @Action(StopCar, { cancelUncompleted: true }) StopCar(
    _: StateContext<StateModel>,
    { params }: StopCar
  ) {
    return this.signalr.send(SentMethods.StopCar, params);
  }

  @Action(WhenCarConnected, { cancelUncompleted: true }) WhenCarConnected({
    patchState
  }: StateContext<StateModel>) {
    return this.signalr.register(ReceivedMethods.WhenCarConnected, (params) =>
      patchState({ whenCarConnected: params })
    );
  }

  @Action(WhenCarDisconnected, { cancelUncompleted: true }) WhenCarDisconnected({
    patchState
  }: StateContext<StateModel>) {
    return this.signalr.register(ReceivedMethods.WhenCarDisconnected, (params) =>
      patchState({ whenCarDisconnected: params })
    );
  }

  @Action(WhenCarRunning, { cancelUncompleted: true }) WhenCarRunning({
    patchState
  }: StateContext<StateModel>) {
    return this.signalr.register(ReceivedMethods.WhenCarRunning, (params) =>
      patchState({ whenCarRunning: params })
    );
  }

  @Action(WhenCarStopping, { cancelUncompleted: true }) WhenCarStopping({
    patchState
  }: StateContext<StateModel>) {
    return this.signalr.register(ReceivedMethods.WhenCarStopping, (params) =>
      patchState({ whenCarStopping: params })
    );
  }
}
