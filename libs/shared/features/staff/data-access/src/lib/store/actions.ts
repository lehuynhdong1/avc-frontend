import { STATE_NAME } from './state.model';
import { ApiAccountsStaffIdGetRequestParams, ApiAccountsStaffsGetRequestParams } from '@shared/api';

const ACTIONS = {
  LOAD_STAFFS: `[${STATE_NAME}] Load Staffs`,
  LOAD_STAFF_BY_ID: `[${STATE_NAME}] Load Staff By Id`
};

export class LoadStaffs {
  static readonly type = ACTIONS.LOAD_STAFFS;
  constructor(public readonly params: ApiAccountsStaffsGetRequestParams) {}
}

export class LoadStaffById {
  static readonly type = ACTIONS.LOAD_STAFF_BY_ID;
  constructor(public readonly params: ApiAccountsStaffIdGetRequestParams) {}
}
