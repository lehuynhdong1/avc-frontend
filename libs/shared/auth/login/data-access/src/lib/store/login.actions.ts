import { LOGIN_STATE_NAME } from './login-state.model';
import { AuthenticationPostDto } from '@shared/api';

const ACTIONS = {
  LOGIN: `[${LOGIN_STATE_NAME}] Login`
};

export class Login {
  static readonly type = ACTIONS.LOGIN;
  constructor(public readonly payload: AuthenticationPostDto) {}
}
