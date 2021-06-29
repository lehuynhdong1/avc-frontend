import { AuthenticationReadDto, RoleReadDto } from '@shared/api';

export enum ERROR_CODES {
  WRONG_USERNAME_OR_PASSWORD,
  LOAD_ROLES_FAILED
}

export interface LoginStateModel extends AuthenticationReadDto {
  error?: ERROR_CODES;
  roles: { result: Array<RoleReadDto> };
}
export const STATE_NAME = 'Shared_Auth_Login';

export const INITIAL_STATE: LoginStateModel = { roles: { result: [] } };
