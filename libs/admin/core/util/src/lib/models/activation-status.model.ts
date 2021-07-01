export const ActivationStatus = {
  All: undefined,
  Active: true,
  Inactive: false
};

export type ActivationStatuses = keyof typeof ActivationStatus;
