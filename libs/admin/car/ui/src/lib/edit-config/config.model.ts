export interface CarConfig {
  hardware_config: HardwareConfig;
  detect_lane_config: DetectLaneConfig;
  speed_config: SpeedConfig;
  servo_config: ServoConfig;
}

export interface DetectLaneConfig {
  height_center_point: number;
  width_center_point: number;
  low_h: number;
  high_h: number;
  threshold_lane_px: number;
}

export interface HardwareConfig {
  camera_index: number;
  motor_port: number;
  servo_port: number;
  trigger_port: number;
  echo_port: number;
}

export interface ServoConfig {
  center_servo: number;
  range_value: number;
}

export interface SpeedConfig {
  speed_up_speed_val: number;
  slow_down_speed_val: number;
  slow_down_speed_turn: number;
  normal_speed_val: number;
  pause_speed_val: number;
  backward_speed_val: number;
  motor_prepair_value: number;
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
    hardware_config: {
      title: 'hardware_config',
      type: 'object',
      additionalProperties: false,
      properties: {
        camera_index: NUMBER_JSON_SCHEMA,
        motor_port: NUMBER_JSON_SCHEMA,
        servo_port: NUMBER_JSON_SCHEMA,
        trigger_port: NUMBER_JSON_SCHEMA,
        echo_port: NUMBER_JSON_SCHEMA
      }
    },
    detect_lane_config: {
      title: 'detect_lane_config',
      type: 'object',
      additionalProperties: false,
      properties: {
        height_center_point: NUMBER_JSON_SCHEMA,
        width_center_point: NUMBER_JSON_SCHEMA,
        low_h: NUMBER_JSON_SCHEMA,
        high_h: NUMBER_JSON_SCHEMA,
        threshold_lane_px: NUMBER_JSON_SCHEMA
      }
    },
    speed_config: {
      title: 'speed_config',
      type: 'object',
      additionalProperties: false,
      properties: {
        speed_up_speed_val: NUMBER_JSON_SCHEMA,
        slow_down_speed_val: NUMBER_JSON_SCHEMA,
        slow_down_speed_turn: NUMBER_JSON_SCHEMA,
        normal_speed_val: NUMBER_JSON_SCHEMA,
        pause_speed_val: NUMBER_JSON_SCHEMA,
        backward_speed_val: NUMBER_JSON_SCHEMA,
        motor_prepair_value: NUMBER_JSON_SCHEMA
      }
    },
    servo_config: {
      title: 'servo_config',
      type: 'object',
      additionalProperties: false,
      properties: {
        center_servo: NUMBER_JSON_SCHEMA,
        range_value: NUMBER_JSON_SCHEMA
      }
    }
  }
};
