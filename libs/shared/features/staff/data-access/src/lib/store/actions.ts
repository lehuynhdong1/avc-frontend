import { STATE_NAME } from './state.model';
import {
  ApiAccountsIdPatchRequestParams,
  ApiAccountsStaffIdGetRequestParams,
  ApiAccountsStaffPostRequestParams,
  ApiAccountsStaffsGetRequestParams
} from '@shared/api';

const ACTIONS = {
  LOAD_STAFFS: `[${STATE_NAME}] Load staffs`,
  LOAD_STAFF_BY_ID: `[${STATE_NAME}] Load staff by id`,
  CREATE_STAFF: `[${STATE_NAME}] Create a new staff`,
  UPDATE_STAFF: `[${STATE_NAME}] Update a new staff`
};

export class LoadStaffs {
  static readonly type = ACTIONS.LOAD_STAFFS;
  constructor(public readonly params: ApiAccountsStaffsGetRequestParams) {}
}

export class LoadStaffById {
  static readonly type = ACTIONS.LOAD_STAFF_BY_ID;
  constructor(public readonly params: ApiAccountsStaffIdGetRequestParams) {}
}

export class CreateStaff {
  static readonly type = ACTIONS.CREATE_STAFF;
  constructor(public readonly params: ApiAccountsStaffPostRequestParams) {}
}
export class UpdateStaff {
  static readonly type = ACTIONS.UPDATE_STAFF;
  constructor(public readonly params: ApiAccountsIdPatchRequestParams) {}
}
