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

import { CarListReadDtoPagingResponseDto } from '../model/models';
import { CarManagedByUpdateDto } from '../model/models';
import { CarReadDto } from '../model/models';

import { Configuration } from '../configuration';

export interface ApiCarsGetRequestParams {
  isAvailable?: boolean;
  isApproved?: boolean;
  page?: number;
  limit?: number;
  searchValue?: string;
}

export interface ApiCarsIdGetRequestParams {
  id: number;
}

export interface ApiCarsManagedbyPutRequestParams {
  carManagedByUpdateDto?: CarManagedByUpdateDto;
}

export interface ApiCarsPostRequestParams {
  deviceId?: string;
}

export interface CarsServiceInterface {
  defaultHeaders: HttpHeaders;
  configuration: Configuration;

  /**
   *
   *
   * @param requestParameters
   */
  apiCarsGet(
    requestParameters: ApiCarsGetRequestParams,
    extraHttpRequestParams?: any
  ): Observable<CarListReadDtoPagingResponseDto>;

  /**
   *
   *
   * @param requestParameters
   */
  apiCarsIdGet(
    requestParameters: ApiCarsIdGetRequestParams,
    extraHttpRequestParams?: any
  ): Observable<CarReadDto>;

  /**
   *
   *
   * @param requestParameters
   */
  apiCarsManagedbyPut(
    requestParameters: ApiCarsManagedbyPutRequestParams,
    extraHttpRequestParams?: any
  ): Observable<{}>;

  /**
   *
   *
   * @param requestParameters
   */
  apiCarsPost(
    requestParameters: ApiCarsPostRequestParams,
    extraHttpRequestParams?: any
  ): Observable<{}>;
}