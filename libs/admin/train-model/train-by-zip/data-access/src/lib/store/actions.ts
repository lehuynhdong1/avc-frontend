import { STATE_NAME } from './state.model';

const ACTIONS = {
  UPDATE_ZIP: `[${STATE_NAME}] Upload zip`
};

export class UpdateZip {
  static readonly type = ACTIONS.UPDATE_ZIP;
  constructor(public readonly file: File) {}
}
