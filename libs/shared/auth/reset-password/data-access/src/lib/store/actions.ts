import { ApiAuthenticationNewPasswordPostRequestParams } from '@shared/api';
import { STATE_NAME } from './state.model';

const ACTIONS = {
  CREATE_NEW_PASSWORD: `[${STATE_NAME}] Create new password`
};

export class CreateNewPassword {
  static readonly type = ACTIONS.CREATE_NEW_PASSWORD;
  constructor(public readonly params: ApiAuthenticationNewPasswordPostRequestParams) {}
}
