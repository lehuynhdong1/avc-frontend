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
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';

import { AccountCreateDto } from '../model/models';
import { AccountReadDto } from '../model/models';
import { AccountReadDtoPagingResponseDto } from '../model/models';

import { Configuration } from '../configuration';

export interface AccountsServiceInterface {
  defaultHeaders: HttpHeaders;
  configuration: Configuration;

  /**
   *
   *
   * @param id
   */
  apiAccountsIdGet(id: number, extraHttpRequestParams?: any): Observable<AccountReadDto>;

  /**
   *
   *
   * @param page
   * @param limit
   * @param searchValue
   */
  apiAccountsManagersGet(
    page?: number,
    limit?: number,
    searchValue?: string,
    extraHttpRequestParams?: any
  ): Observable<AccountReadDtoPagingResponseDto>;

  /**
   *
   *
   * @param accountCreateDto
   */
  apiAccountsPost(
    accountCreateDto?: AccountCreateDto,
    extraHttpRequestParams?: any
  ): Observable<AccountReadDto>;

  /**
   *
   *
   * @param page
   * @param limit
   * @param searchValue
   */
  apiAccountsStaffsGet(
    page?: number,
    limit?: number,
    searchValue?: string,
    extraHttpRequestParams?: any
  ): Observable<AccountReadDtoPagingResponseDto>;
}
