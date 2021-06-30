import { STATE_NAME } from './state.model';
import {
  ApiAccountsIdPatchRequestParams,
  ApiAccountsManagerIdGetRequestParams,
  ApiAccountsManagerPostRequestParams,
  ApiAccountsManagersGetRequestParams
} from '@shared/api';

const ACTIONS = {
  LOAD_MANAGERS: `[${STATE_NAME}] Load managers`,
  LOAD_MANAGER_BY_ID: `[${STATE_NAME}] Load manager by ID`,
  CREATE_MANAGER: `[${STATE_NAME}] Create a new manager`,
  UPDATE_MANAGER: `[${STATE_NAME}] Update manager by ID`
};

export class LoadManagers {
  static readonly type = ACTIONS.LOAD_MANAGERS;
  constructor(public readonly params: ApiAccountsManagersGetRequestParams) {}
}

export class LoadManagerById {
  static readonly type = ACTIONS.LOAD_MANAGER_BY_ID;
  constructor(public readonly params: ApiAccountsManagerIdGetRequestParams) {}
}

export class CreateManager {
  static readonly type = ACTIONS.CREATE_MANAGER;
  constructor(public readonly params: ApiAccountsManagerPostRequestParams) {}
}

export class UpdateManager {
  static readonly type = ACTIONS.UPDATE_MANAGER;
  constructor(public readonly params: ApiAccountsIdPatchRequestParams) {}
}
