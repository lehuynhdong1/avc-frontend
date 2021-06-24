import { STATE_NAME } from './state.model';
import {
  ApiAccountsManagerIdGetRequestParams,
  ApiAccountsManagersGetRequestParams
} from '@shared/api';

const ACTIONS = {
  LOAD_MANAGERS: `[${STATE_NAME}] Load Managers`,
  LOAD_MANAGER_BY_ID: `[${STATE_NAME}] Load Manager By Id`
};

export class LoadManagers {
  static readonly type = ACTIONS.LOAD_MANAGERS;
  constructor(public readonly params: ApiAccountsManagersGetRequestParams) {}
}

export class LoadManagerById {
  static readonly type = ACTIONS.LOAD_MANAGER_BY_ID;
  constructor(public readonly params: ApiAccountsManagerIdGetRequestParams) {}
}
