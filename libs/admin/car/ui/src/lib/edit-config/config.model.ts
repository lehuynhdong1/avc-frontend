export interface CarConfig {
  hardwareConfig: HardwareConfig;
  detectLaneConfig: DetectLaneConfig;
  speedConfig: SpeedConfig;
}

export interface DetectLaneConfig {
  HEIGHT_CENTER_POINT: number;
  WIDTH_CENTER_POINT: number;
  LOW_H: number;
  HIGH_H: number;
}

export interface HardwareConfig {
  CAMERA_INDEX: number;
  MOTOR_PORT: number;
  SERVO_PORT: number;
  GPIO_TRIGGER: number;
  MOTOR_PREPAIR_VALUE: number;
}

export interface SpeedConfig {
  SPEED_UP_SPEED_VAL: number;
  SLOW_DOWN_SPEED_VAL: number;
  NORMAL_SPEED_VAL: number;
  PAUSE_SPEED_VAL: number;
  BACKWARD_SPEED_VAL: number;
}

const NUMBER_JSON_SCHEMA = {
  type: 'number',
  minimum: 0,
  readOnly: true,
  additionalProperties: false
};
export const CAR_CONFIG_SCHEMA = {
  title: 'CAR_CONFIG_SCHEMA',
  description: 'A simple form example.',
  type: 'object',
  additionalProperties: false,
  properties: {
    hardwareConfig: {
      title: 'hardwareConfig',
      type: 'object',
      additionalProperties: false,
      properties: {
        CAMERA_INDEX: NUMBER_JSON_SCHEMA,
        MOTOR_PORT: NUMBER_JSON_SCHEMA,
        SERVO_PORT: NUMBER_JSON_SCHEMA,
        GPIO_TRIGGER: NUMBER_JSON_SCHEMA,
        MOTOR_PREPAIR_VALUE: NUMBER_JSON_SCHEMA
      }
    },
    detectLaneConfig: {
      title: 'detectLaneConfig',
      type: 'object',
      properties: {
        HEIGHT_CENTER_POINT: NUMBER_JSON_SCHEMA,
        WIDTH_CENTER_POINT: NUMBER_JSON_SCHEMA,
        LOW_H: NUMBER_JSON_SCHEMA,
        HIGH_H: NUMBER_JSON_SCHEMA
      }
    },
    speedConfig: {
      title: 'speedConfig',
      type: 'object',
      properties: {
        SPEED_UP_SPEED_VAL: NUMBER_JSON_SCHEMA,
        SLOW_DOWN_SPEED_VAL: NUMBER_JSON_SCHEMA,
        NORMAL_SPEED_VAL: NUMBER_JSON_SCHEMA,
        PAUSE_SPEED_VAL: NUMBER_JSON_SCHEMA,
        BACKWARD_SPEED_VAL: NUMBER_JSON_SCHEMA
      }
    }
  }
};
