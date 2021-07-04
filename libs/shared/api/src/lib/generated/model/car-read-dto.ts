/**
 * AVC System
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { AccountNotManagedByReadDto } from './account-not-managed-by-read-dto';
import { IssueReadDto } from './issue-read-dto';
import { AccountStaffAssignToReadDto } from './account-staff-assign-to-read-dto';

export interface CarReadDto {
  id?: number;
  image?: string | null;
  name?: string | null;
  isConnecting?: boolean;
  isAvailable?: boolean | null;
  createdAt?: string | null;
  deviceId?: string | null;
  configUrl?: string | null;
  isApproved?: boolean | null;
  managedBy?: AccountNotManagedByReadDto;
  assignTo?: AccountStaffAssignToReadDto;
  issues?: Array<IssueReadDto> | null;
}
