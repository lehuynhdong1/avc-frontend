export enum Role {
  ADMIN = 2,
  MANAGER = 3,
  STAFF = 4
}
export enum RoleName {
  Admin = 'Admin',
  Manager = 'Manager',
  Staff = 'Staff'
}
export type RoleNameType = keyof typeof RoleName;
