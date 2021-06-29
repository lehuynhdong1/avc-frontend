import { STATE_NAME } from './login-state.model';
import { AuthenticationPostDto } from '@shared/api';

const ACTIONS = {
  LOGIN: `[${STATE_NAME}] Login`,
  LOAD_ROLES: `[${STATE_NAME}] Load roles only 1 time`
};

export class Login {
  static readonly type = ACTIONS.LOGIN;
  constructor(public readonly payload: AuthenticationPostDto) {}
}

export class LoadRoles {
  static readonly type = ACTIONS.LOAD_ROLES;
}
