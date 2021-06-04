import { LOGIN_STATE_NAME, LoginStateModel } from './login-state.model';
import { AuthenticationPostDto, AuthenticationReadDto } from '@shared/api';

const ACTIONS = {
  LOGIN: `[${LOGIN_STATE_NAME}] Login`,
  LOGIN_SUCCESS: `[${LOGIN_STATE_NAME}] Login Success`,
  LOGIN_ERROR: `[${LOGIN_STATE_NAME}] Login Error`
};

export class Login {
  static readonly type = ACTIONS.LOGIN;
  constructor(public readonly payload: AuthenticationPostDto) {}
}

export class LoginSuccess {
  static readonly type = ACTIONS.LOGIN_SUCCESS;
  constructor(public readonly payload: AuthenticationReadDto) {}
}
export class LoginError {
  static readonly type = ACTIONS.LOGIN_ERROR;
  constructor(public readonly payload: LoginStateModel['error']) {}
}
