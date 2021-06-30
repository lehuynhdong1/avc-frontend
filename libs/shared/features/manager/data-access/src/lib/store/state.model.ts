import {
  AccountManagerReadDtoPagingResponseDto,
  AccountManagerReadDto,
  ApiAccountsManagerPostRequestParams
} from '@shared/api';

export interface StateModel {
  listing: AccountManagerReadDtoPagingResponseDto | null;
  detail: AccountManagerReadDto | null;
  create?: ApiAccountsManagerPostRequestParams;
  errorMessage?: string;
}

export const STATE_NAME = 'Shared_Account_Manager';

export const INITIAL_STATE: StateModel = {
  listing: null,
  detail: null
};
