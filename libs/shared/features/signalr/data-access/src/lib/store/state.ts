import { LoginState } from '@shared/auth/login/data-access';
import { State, Action, StateContext, Store, createSelector } from '@ngxs/store';
import { STATE_NAME, StateModel, INITIAL_STATE } from './state.model';
import { Injectable } from '@angular/core';
import {
  ALL_RECEIVED_METHODS,
  getReceivedMethods,
  ReceivedMethodsKey,
  RoleNameType,
  SentMethods,
  SignalRService
} from '@shared/util';
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
  static get<T extends ReceivedMethodsKey>(type: T) {
    return createSelector([SignalRState], (state: StateModel) => state[type]);
  }

  constructor(private signalr: SignalRService, private store: Store) {}

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
    const me = this.store.selectSnapshot(LoginState.account);
    if (!me) return;

    const receivedMethods = getReceivedMethods(me.role as RoleNameType);
    // const sameParams = [
    //   'WhenCarConnected',
    //   'WhenCarDisconnected',
    //   'WhenCarRunning',
    //   'WhenCarStopping'
    // ];
    if (receivedMethods.includes('WhenCarConnected'))
      this.signalr.register('WhenCarConnected', (params) => {
        if (me.id && params.accountIdList.includes(me.id)) patchState({ WhenCarConnected: params });
      });
    if (receivedMethods.includes('WhenCarDisconnected'))
      this.signalr.register('WhenCarDisconnected', (params) => {
        if (me.id && params.accountIdList.includes(me.id))
          patchState({ WhenCarDisconnected: params });
      });
    if (receivedMethods.includes('WhenCarRunning'))
      this.signalr.register('WhenCarRunning', (params) => {
        if (me.id && params.accountIdList.includes(me.id)) patchState({ WhenCarRunning: params });
      });
    if (receivedMethods.includes('WhenCarStopping'))
      this.signalr.register('WhenCarStopping', (params) => {
        if (me.id && params.accountIdList.includes(me.id)) patchState({ WhenCarStopping: params });
      });

    if (receivedMethods.includes('WhenAdminChangeCarManagedBy'))
      this.signalr.register('WhenAdminChangeCarManagedBy', (params) => {
        if (me.id && params.receiverId === me.id)
          patchState({ WhenAdminChangeCarManagedBy: params });
      });
    if (receivedMethods.includes('WhenAdminChangeStaffManagedBy'))
      this.signalr.register('WhenAdminChangeStaffManagedBy', (params) => {
        if (me.id && params.receiverId === me.id)
          patchState({ WhenAdminChangeStaffManagedBy: params });
      });

    if (receivedMethods.includes('WhenManagerChangeAssignedCar'))
      this.signalr.register('WhenManagerChangeAssignedCar', (params) => {
        if (me.id && params.receiverId === me.id)
          patchState({ WhenManagerChangeAssignedCar: params });
      });

    if (receivedMethods.includes('WhenStaffDeactivated'))
      this.signalr.register('WhenStaffDeactivated', (params) => {
        if (me.id && params.receiverId === me.id) patchState({ WhenStaffDeactivated: params });
      });

    if (receivedMethods.includes('WhenManagerDeactivated'))
      this.signalr.register('WhenManagerDeactivated', (params) => {
        if (me.id && params.receiverIdList.includes(me.id))
          patchState({ WhenManagerDeactivated: params });
      });

    if (receivedMethods.includes('WhenThisAccountDeactivated'))
      this.signalr.register('WhenThisAccountDeactivated', (receiverId) => {
        if (me.id && receiverId === me.id) patchState({ WhenThisAccountDeactivated: receiverId });
      });

    if (receivedMethods.includes('WhenCarDeactivated'))
      this.signalr.register('WhenCarDeactivated', (params) => {
        if (me.id && params.receiverIdList.includes(me.id))
          patchState({ WhenCarDeactivated: params });
      });

    if (receivedMethods.includes('WhenIssueCreated'))
      this.signalr.register('WhenIssueCreated', (params) => {
        if (me.id && params.receiverIdList.includes(me.id))
          patchState({ WhenIssueCreated: params });
      });

    if (receivedMethods.includes('WhenNewCarRegistered'))
      this.signalr.register('WhenNewCarRegistered', (params) =>
        patchState({ WhenNewCarRegistered: params })
      );
  }

  @Action(UnregisterAllListeners, { cancelUncompleted: true })
  UnregisterAllListeners({ setState }: StateContext<StateModel>) {
    ALL_RECEIVED_METHODS.forEach((key) => this.signalr.unregister(key));
    setState({});
  }
}
