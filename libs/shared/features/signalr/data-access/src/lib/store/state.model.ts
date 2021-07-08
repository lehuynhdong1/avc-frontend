import { ReceivedResponses, ReceivedMethods } from '@shared/util';

export interface StateModel {
  whenCarConnected?: ReceivedResponses[ReceivedMethods.WhenCarConnected];
  whenCarDisconnected?: ReceivedResponses[ReceivedMethods.WhenCarDisconnected];
  whenCarRunning?: ReceivedResponses[ReceivedMethods.WhenCarRunning];
  whenCarStopping?: ReceivedResponses[ReceivedMethods.WhenCarStopping];
  errorMessage?: string;
}

export const STATE_NAME = 'Shared_SignalR';

export const INITIAL_STATE: StateModel = {};
