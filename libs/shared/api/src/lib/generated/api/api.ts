export * from './accounts.service';
import { AccountsService } from './accounts.service';
export * from './accounts.serviceInterface';
export * from './authentication.service';
import { AuthenticationService } from './authentication.service';
export * from './authentication.serviceInterface';
export * from './check.service';
import { CheckService } from './check.service';
export * from './check.serviceInterface';
export * from './genders.service';
import { GendersService } from './genders.service';
export * from './genders.serviceInterface';
export * from './profile.service';
import { ProfileService } from './profile.service';
export * from './profile.serviceInterface';
export * from './roles.service';
import { RolesService } from './roles.service';
export * from './roles.serviceInterface';
export const APIS = [
  AccountsService,
  AuthenticationService,
  CheckService,
  GendersService,
  ProfileService,
  RolesService
];
