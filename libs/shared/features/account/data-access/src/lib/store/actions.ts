import { STATE_NAME } from './state.model';

const ACTIONS = {
  TOGGLE_ACTIVATION: `[${STATE_NAME}] Toggle activation of an account`
};

export class ToggleActivation {
  static readonly type = ACTIONS.TOGGLE_ACTIVATION;
  constructor(public readonly payload: { id: number; currentValue: boolean }) {}
}
