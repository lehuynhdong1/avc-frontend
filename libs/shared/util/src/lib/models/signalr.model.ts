export enum ReceivedMethods {
  WhenCarConnected = 'WhenCarConnected',
  WhenCarDisconnected = 'WhenCarDisconnected',
  WhenCarRunning = 'WhenCarRunning',
  WhenCarStopping = 'WhenCarStopping'
}
export type ReceivedResponses = {
  [ReceivedMethods.WhenCarConnected]: WhenCarConnected;
  [ReceivedMethods.WhenCarDisconnected]: WhenCarDisconnected;
  [ReceivedMethods.WhenCarRunning]: WhenCarRunning;
  [ReceivedMethods.WhenCarStopping]: WhenCarStopping;
};

export enum SentMethods {
  ConnectAccount = 'ConnectAccount',
  StartCar = 'StartCar',
  StopCar = 'StopCar'
}
export type SentParams = {
  [SentMethods.ConnectAccount]: ConnectAccountParams;
  [SentMethods.StartCar]: StartCarParams;
  [SentMethods.StopCar]: StopCarParams;
};

interface WhenCarConnected {
  accountIdList: number[];
  carId: number;
}
type WhenCarDisconnected = WhenCarConnected;
type WhenCarRunning = WhenCarConnected;
type WhenCarStopping = WhenCarConnected;

interface ConnectAccountParams {
  accountId: number;
}

interface StartCarParams {
  carId: number;
}
type StopCarParams = StartCarParams;
