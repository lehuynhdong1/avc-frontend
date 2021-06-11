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

import { GenderReadDto } from '../model/models';

import { Configuration } from '../configuration';

export interface GendersServiceInterface {
  defaultHeaders: HttpHeaders;
  configuration: Configuration;

  /**
   * Get all genders of system
   *
   */
  apiGendersGet(extraHttpRequestParams?: any): Observable<Array<GenderReadDto>>;
}