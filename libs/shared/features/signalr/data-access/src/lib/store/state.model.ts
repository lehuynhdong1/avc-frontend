import { ReceivedResponses } from '@shared/util';

export interface StateModel extends Partial<ReceivedResponses> {
  errorMessage?: string;
}

export const STATE_NAME = 'Shared_SignalR';

export const INITIAL_STATE: StateModel = {};
