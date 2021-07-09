import { State, Action, StateContext, Selector } from '@ngxs/store';
import { STATE_NAME, StateModel, INITIAL_STATE } from './state.model';
import { Injectable } from '@angular/core';
import { ReceivedMethods, SentMethods, SignalRService } from '@shared/util';
import {
  ConnectAccount,
  StartCar,
  StopCar,
  StartSignalR,
  StopSignalR,
  RegisterAllListeners,
  UnregisterAllListeners
} from './actions';

@State<StateModel>({
  name: STATE_NAME,
  defaults: INITIAL_STATE
})
@Injectable()
export class SignalRState {
  @Selector()
  static whenCarConnected(state: StateModel): StateModel['WhenCarConnected'] {
    return state.WhenCarConnected;
  }
  @Selector()
  static get(state: StateModel) {
    return (type: ReceivedMethods) => state[type];
  }

  constructor(private signalr: SignalRService) {}

  @Action(StartSignalR, { cancelUncompleted: true })
  StartSignalR() {
    return this.signalr.start();
  }
  @Action(StopSignalR, { cancelUncompleted: true })
  StopSignalR() {
    return this.signalr.stop();
  }

  @Action(ConnectAccount, { cancelUncompleted: true })
  ConnectAccount(_: StateContext<StateModel>, { params }: ConnectAccount) {
    this.signalr.send(SentMethods.ConnectAccount, params);
  }
  @Action(StartCar, { cancelUncompleted: true })
  StartCar(_: StateContext<StateModel>, { params }: StartCar) {
    this.signalr.send(SentMethods.StartCar, params);
  }

  @Action(StopCar, { cancelUncompleted: true })
  StopCar(_: StateContext<StateModel>, { params }: StopCar) {
    this.signalr.send(SentMethods.StopCar, params);
  }

  @Action(RegisterAllListeners, { cancelUncompleted: true })
  RegisterAllListeners({ patchState }: StateContext<StateModel>) {
    const keys = Object.keys(ReceivedMethods) as Array<keyof typeof ReceivedMethods>;
    keys.forEach((key) =>
      this.signalr.register(ReceivedMethods[key], (params) => patchState({ [key]: params }))
    );
  }

  @Action(UnregisterAllListeners, { cancelUncompleted: true })
  UnregisterAllListeners({ setState }: StateContext<StateModel>) {
    const keys = Object.keys(ReceivedMethods) as Array<keyof typeof ReceivedMethods>;
    keys.forEach((key) => this.signalr.unregister(ReceivedMethods[key]));
    setState({});
  }
}
