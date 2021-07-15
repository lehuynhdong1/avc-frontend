export enum Labels {
  STOP,
  SPEED_UP,
  SPEED_DOWN,
  TURN_LEFT,
  TURN_RIGHT,
  FORWARD,
  GREEN_LIGHT,
  RED_LIGHT
}
export type LabelTypes = keyof typeof Labels;

const allAttributesOfLabels = Object.keys(Labels);

export const labels = allAttributesOfLabels
  .filter((_, index) => index >= allAttributesOfLabels.length / 2)
  .map((key) => key.toLowerCase());
