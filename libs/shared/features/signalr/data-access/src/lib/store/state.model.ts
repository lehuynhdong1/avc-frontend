import { ReceivedResponses, ReceivedMethods } from '@shared/util';

export interface StateModel {
  [ReceivedMethods.WhenCarConnected]?: ReceivedResponses[ReceivedMethods.WhenCarConnected];
  [ReceivedMethods.WhenCarDisconnected]?: ReceivedResponses[ReceivedMethods.WhenCarDisconnected];
  [ReceivedMethods.WhenCarRunning]?: ReceivedResponses[ReceivedMethods.WhenCarRunning];
  [ReceivedMethods.WhenCarStopping]?: ReceivedResponses[ReceivedMethods.WhenCarStopping];
  errorMessage?: string;
}

export const STATE_NAME = 'Shared_SignalR';

export const INITIAL_STATE: StateModel = {};
