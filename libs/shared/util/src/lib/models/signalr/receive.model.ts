import { RoleName, RoleNameType } from '../role.model';

export type ReceivedResponses = {
  // Method Name <> Response Interface <> Role
  WhenCarConnected: WhenCarConnected; // ✅ Manager, Staff
  WhenCarDisconnected: WhenCarDisconnected; // ✅ Manager, Staff
  WhenCarRunning: WhenCarRunning; // ✅ Manager, Staff
  WhenCarStopping: WhenCarStopping; // ✅ Manager, Staff

  WhenAdminChangeCarManagedBy: WhenAdminChangeCarManagedBy; // ✅ Manager
  WhenAdminChangeStaffManagedBy: WhenAdminChangeStaffManagedBy; // ✅ Manager, Staff
  WhenManagerChangeAssignedCar: WhenManagerChangeAssignedCar; // ✅ Staff
  WhenStaffDeactivated: WhenStaffDeactivated; // ✅ Manager
  WhenManagerDeactivated: WhenManagerDeactivated; // ✅ Staff
  WhenThisAccountDeactivated: WhenThisAccountDeactivated; // ✅ Manager, Staff
  WhenCarDeactivated: WhenCarDeactivated; // ✅ Manager, Staff
  WhenIssueCreated: WhenIssueCreated; // ✅ Manager, Staff
  WhenModelStatusChanged: WhenModelStatusChanged; // ✅ Admin
  WhenNewCarRegistered: string; // ✅ Admin
};

export type ReceivedMethodsKey = keyof ReceivedResponses;

export function getReceivedMethods(roleId: RoleNameType): ReadonlyArray<ReceivedMethodsKey> {
  switch (roleId) {
    case RoleName.Admin:
      return ['WhenModelStatusChanged', 'WhenNewCarRegistered'];
    case RoleName.Manager:
      return [
        'WhenCarConnected',
        'WhenCarDisconnected',
        'WhenCarRunning',
        'WhenCarStopping',
        'WhenAdminChangeCarManagedBy',
        'WhenAdminChangeStaffManagedBy',
        'WhenStaffDeactivated',
        'WhenThisAccountDeactivated',
        'WhenCarDeactivated',
        'WhenIssueCreated'
      ];
    case RoleName.Staff:
      return [
        'WhenCarConnected',
        'WhenCarDisconnected',
        'WhenCarRunning',
        'WhenCarStopping',
        'WhenAdminChangeStaffManagedBy',
        'WhenManagerChangeAssignedCar',
        'WhenManagerDeactivated',
        'WhenThisAccountDeactivated',
        'WhenCarDeactivated',
        'WhenIssueCreated'
      ];
    default:
      return [];
  }
}

export const ALL_RECEIVED_METHODS: ReadonlyArray<ReceivedMethodsKey> = [
  'WhenCarConnected',
  'WhenCarDisconnected',
  'WhenCarRunning',
  'WhenCarStopping',

  'WhenAdminChangeCarManagedBy',
  'WhenAdminChangeStaffManagedBy',
  'WhenManagerChangeAssignedCar',
  'WhenStaffDeactivated',
  'WhenManagerDeactivated',
  'WhenThisAccountDeactivated',
  'WhenCarDeactivated',
  'WhenIssueCreated',
  'WhenModelStatusChanged'
];

export interface WhenCarConnected {
  accountIdList: number[];
  carId: number;
}
type WhenCarDisconnected = WhenCarConnected;
type WhenCarRunning = WhenCarConnected;
type WhenCarStopping = WhenCarConnected;

export interface WhenAdminChangeCarManagedBy {
  receiverId: number;
  carId: number;
  message: string;
}

export interface WhenAdminChangeStaffManagedBy {
  receiverId: number;
  staffId: number;
  message: string;
}

export interface WhenManagerChangeAssignedCar {
  receiverId: number;
  carId: number;
  message: string;
}

export interface WhenStaffDeactivated {
  receiverId: number;
  staffId: number;
  message: string;
}

export interface WhenManagerDeactivated {
  receiverIdList: number[];
  deactivatedId: number;
  message: string;
}

export type WhenThisAccountDeactivated = number;
export interface WhenCarDeactivated {
  receiverIdList: number[];
  carId: number;
  message: string;
}
export type WhenIssueCreated = WhenCarDeactivated;

export interface WhenModelStatusChanged {
  receiverId: number;
  modelId: number;
  message: string;
}
