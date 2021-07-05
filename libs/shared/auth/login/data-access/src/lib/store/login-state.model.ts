import { AuthenticationReadDto, RoleReadDto } from '@shared/api';
export interface LoginStateModel extends AuthenticationReadDto {
  errorMessage?: string;
  roles: { result: Array<RoleReadDto> };
}
export const STATE_NAME = 'Shared_Auth_Login';

export const INITIAL_STATE: LoginStateModel = { roles: { result: [] } };
