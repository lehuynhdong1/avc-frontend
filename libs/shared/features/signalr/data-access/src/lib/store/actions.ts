import { ReceivedMethods, ReceivedResponses, SentParams, SentMethods } from '@shared/util';
import { STATE_NAME } from './state.model';

const ACTIONS = {
  START_SIGNALR: `${STATE_NAME} Start SignalR`,
  SEND_CONNECT_ACCOUNT: `[${STATE_NAME}] Send connect account`,
  SEND_START_CAR: `[${STATE_NAME}] Send start car`,
  SEND_STOP_CAR: `[${STATE_NAME}] Send stop car`,
  RECEIVE_WHEN_CAR_CONNECTED: `[${STATE_NAME}] Receive when car connected`,
  RECEIVE_WHEN_CAR_DISCONNECTED: `[${STATE_NAME}] Receive when car disconnected`,
  RECEIVE_WHEN_CAR_RUNNING: `[${STATE_NAME}] Receive when car is running`,
  RECEIVE_WHEN_CAR_STOPPING: `[${STATE_NAME}] Receive when car is stopping`
};

export class StartSignalR {
  static readonly type = ACTIONS.START_SIGNALR;
}

export class ConnectAccount {
  static readonly type = ACTIONS.SEND_CONNECT_ACCOUNT;
  constructor(public readonly params: SentParams[SentMethods.ConnectAccount]) {}
}

export class StartCar {
  static readonly type = ACTIONS.SEND_START_CAR;
  constructor(public readonly params: SentParams[SentMethods.StartCar]) {}
}

export class StopCar {
  static readonly type = ACTIONS.SEND_STOP_CAR;
  constructor(public readonly params: SentParams[SentMethods.StopCar]) {}
}

export class WhenCarConnected {
  static readonly type = ACTIONS.RECEIVE_WHEN_CAR_CONNECTED;
  constructor(public readonly params: ReceivedResponses[ReceivedMethods.WhenCarConnected]) {}
}

export class WhenCarDisconnected {
  static readonly type = ACTIONS.RECEIVE_WHEN_CAR_DISCONNECTED;
  constructor(public readonly params: ReceivedResponses[ReceivedMethods.WhenCarDisconnected]) {}
}

export class WhenCarRunning {
  static readonly type = ACTIONS.RECEIVE_WHEN_CAR_RUNNING;
  constructor(public readonly params: ReceivedResponses[ReceivedMethods.WhenCarRunning]) {}
}

export class WhenCarStopping {
  static readonly type = ACTIONS.RECEIVE_WHEN_CAR_STOPPING;
  constructor(public readonly params: ReceivedResponses[ReceivedMethods.WhenCarStopping]) {}
}
