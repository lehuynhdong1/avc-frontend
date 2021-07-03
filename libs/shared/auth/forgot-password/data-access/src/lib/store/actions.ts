import { ApiAuthenticationResetPostRequestParams } from '@shared/api';
import { STATE_NAME } from './state.model';

const ACTIONS = {
  SEND_RECOVERY_LINK: `[${STATE_NAME}] Send recovery link`
};

export class SendRecoveryLink {
  static readonly type = ACTIONS.SEND_RECOVERY_LINK;
  constructor(public readonly params: ApiAuthenticationResetPostRequestParams) {}
}
