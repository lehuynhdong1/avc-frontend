export * from './accounts.service';
import { AccountsService } from './accounts.service';
export * from './accounts.serviceInterface';
export * from './authentication.service';
import { AuthenticationService } from './authentication.service';
export * from './authentication.serviceInterface';
export * from './cars.service';
import { CarsService } from './cars.service';
export * from './cars.serviceInterface';
export * from './check.service';
import { CheckService } from './check.service';
export * from './check.serviceInterface';
export * from './issue.service';
import { IssueService } from './issue.service';
export * from './issue.serviceInterface';
export * from './issue-types.service';
import { IssueTypesService } from './issue-types.service';
export * from './issue-types.serviceInterface';
export * from './model.service';
import { ModelService } from './model.service';
export * from './model.serviceInterface';
export * from './profile.service';
import { ProfileService } from './profile.service';
export * from './profile.serviceInterface';
export * from './roles.service';
import { RolesService } from './roles.service';
export * from './roles.serviceInterface';
export * from './user-notifications.service';
import { UserNotificationsService } from './user-notifications.service';
export * from './user-notifications.serviceInterface';
export const APIS = [
  AccountsService,
  AuthenticationService,
  CarsService,
  CheckService,
  IssueService,
  IssueTypesService,
  ModelService,
  ProfileService,
  RolesService,
  UserNotificationsService
];
