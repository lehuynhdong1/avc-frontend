import { AuthenticationReadDto } from '@shared/api';

export enum ERROR_CODES {
  WRONG_USERNAME_OR_PASSWORD
}

export interface LoginStateModel extends AuthenticationReadDto {
  error?: ERROR_CODES;
}
export const LOGIN_STATE_NAME = 'Shared_Auth_Login';

export const INITIAL_STATE: LoginStateModel = {};
