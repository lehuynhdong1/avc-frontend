// export enum NotificationType {
//   Issue = 'Issue',
//   AssignCar = 'Assign Car',
//   StaffManagedBy = 'Staff Managed By',
//   CarManagedBy = 'Car Managed By',
//   TrainFailed = 'Train Failed',
//   TrainSuccess = 'Train Success',
//   Trainning = 'Trainning',
//   DeactivatedAccount = 'Deactivated Account',
//   DeactivatedCar = 'Deactivated Car'
// }

export type NotificationType =
  | 'Issue'
  | 'Assign Car'
  | 'Staff Managed By'
  | 'Car Managed By'
  | 'Train Failed'
  | 'Train Success'
  | 'Trainning'
  | 'Deactivated Account'
  | 'Deactivated Car';

export const NotificationIconMapper = {
  Issue: 'warning-outline',
  'Assign Car': 'car-sport-primary',
  'Staff Managed By': 'people-success',
  'Car Managed By': 'car-sport-primary',
  'Train Failed': 'rocket-error',
  'Train Success': 'rocket-success',
  Trainning: 'rocket-primary',
  'Deactivated Account': 'people-error',
  'Deactivated Car': 'car-sport-error'
};
