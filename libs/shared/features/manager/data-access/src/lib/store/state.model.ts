import {
  AccountNotManagedByReadDtoPagingResponseDto,
  AccountManagerDetailReadDto,
  ApiAccountsManagerPostRequestParams
} from '@shared/api';

export interface StateModel {
  listing: AccountNotManagedByReadDtoPagingResponseDto | null;
  detail: AccountManagerDetailReadDto | null;
  create?: ApiAccountsManagerPostRequestParams;
  errorMessage?: string;
}

export const STATE_NAME = 'Shared_Account_Manager';

export const INITIAL_STATE: StateModel = {
  listing: null,
  detail: null
};
