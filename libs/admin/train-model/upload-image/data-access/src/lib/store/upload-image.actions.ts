import { STATE_NAME } from './upload-image-state.model';

const ACTIONS = {
  UPDATE_IMAGES: `[${STATE_NAME}] Update images`
};

export class UpdateImages {
  static readonly type = ACTIONS.UPDATE_IMAGES;
  constructor(public readonly files: ReadonlyArray<File>) {}
}
