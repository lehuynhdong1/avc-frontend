import { SentParams, SentMethods } from '@shared/util';
import { STATE_NAME } from './state.model';

const ACTIONS = {
  START_SIGNALR: `${STATE_NAME} Start SignalR`,
  STOP_SIGNALR: `${STATE_NAME} Stop SignalR`,
  SEND_CONNECT_ACCOUNT: `[${STATE_NAME}] Send connect account`,
  SEND_START_CAR: `[${STATE_NAME}] Send start car`,
  SEND_STOP_CAR: `[${STATE_NAME}] Send stop car`,
  REGISTER_ALL_LISTENERS: `[${STATE_NAME}] Register all listeners`,
  UNREGISTER_ALL_LISTENERS: `[${STATE_NAME}] Unregister all listeners`
};

export class StartSignalR {
  static readonly type = ACTIONS.START_SIGNALR;
}

export class StopSignalR {
  static readonly type = ACTIONS.STOP_SIGNALR;
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

export class RegisterAllListeners {
  static readonly type = ACTIONS.REGISTER_ALL_LISTENERS;
}

export class UnregisterAllListeners {
  static readonly type = ACTIONS.UNREGISTER_ALL_LISTENERS;
}
