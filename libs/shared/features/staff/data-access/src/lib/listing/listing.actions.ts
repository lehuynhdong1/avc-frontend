import { STATE_NAME, AccountTypes } from './listing-state.model';
import { ApiAccountsStaffsGetRequestParams } from '@shared/api';

const ACTIONS = {
  LOAD_ACCOUNTS: `[${STATE_NAME}] Load Accounts`
};

export class LoadAccounts {
  static readonly type = ACTIONS.LOAD_ACCOUNTS;
  constructor(
    public readonly type: AccountTypes,
    public readonly params: ApiAccountsStaffsGetRequestParams
  ) {}
}
