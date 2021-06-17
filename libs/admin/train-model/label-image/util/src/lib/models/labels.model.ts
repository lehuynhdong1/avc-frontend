export enum Labels {
  STOP = 0,
  GO_FORWARD = 1,
  TURN_LEFT = 2,
  TURN_RIGHT = 3
}
export type LabelTypes = keyof typeof Labels;
