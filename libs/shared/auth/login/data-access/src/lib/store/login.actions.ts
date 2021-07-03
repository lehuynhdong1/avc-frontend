import { STATE_NAME } from './login-state.model';
import { AuthenticationPostDto, AccountStaffDetailReadDto } from '@shared/api';

const ACTIONS = {
  LOGIN: `[${STATE_NAME}] Login`,
  LOAD_ROLES: `[${STATE_NAME}] Load roles only 1 time`,
  UPDATE_PROFILE: `[${STATE_NAME}] Update profile`,
  LOAD_TOKEN: `[${STATE_NAME}] Load token`
};

export class Login {
  static readonly type = ACTIONS.LOGIN;
  constructor(public readonly payload: AuthenticationPostDto) {}
}

export class LoadRoles {
  static readonly type = ACTIONS.LOAD_ROLES;
}

export class UpdateProfile {
  static readonly type = ACTIONS.UPDATE_PROFILE;
  constructor(public readonly payload: AccountStaffDetailReadDto) {}
}

export class LoadToken {
  static readonly type = ACTIONS.LOAD_TOKEN;
}
