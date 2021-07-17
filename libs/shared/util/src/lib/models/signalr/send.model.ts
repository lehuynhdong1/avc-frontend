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

type ConnectAccountParams = number;

type StartCarParams = number;
type StopCarParams = StartCarParams;
