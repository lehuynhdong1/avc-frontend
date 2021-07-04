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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
  HttpEvent,
  HttpParameterCodec
} from '@angular/common/http';
import { CustomHttpParameterCodec } from '../encoder';
import { Observable } from 'rxjs';

import { CarActivationDto } from '../model/models';
import { CarListReadDtoPagingResponseDto } from '../model/models';
import { CarManagedByUpdateDto } from '../model/models';
import { CarReadDto } from '../model/models';

import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';
import {
  CarsServiceInterface,
  ApiCarsGetRequestParams,
  ApiCarsIdActivationPutRequestParams,
  ApiCarsIdApprovementPutRequestParams,
  ApiCarsIdGetRequestParams,
  ApiCarsManagedbyPutRequestParams,
  ApiCarsPostRequestParams
} from './cars.serviceInterface';

@Injectable({
  providedIn: 'root'
})
export class CarsService implements CarsServiceInterface {
  protected basePath = 'http://localhost';
  public defaultHeaders = new HttpHeaders();
  public configuration = new Configuration();
  public encoder: HttpParameterCodec;

  constructor(
    protected httpClient: HttpClient,
    @Optional() @Inject(BASE_PATH) basePath: string,
    @Optional() configuration: Configuration
  ) {
    if (configuration) {
      this.configuration = configuration;
    }
    if (typeof this.configuration.basePath !== 'string') {
      if (typeof basePath !== 'string') {
        basePath = this.basePath;
      }
      this.configuration.basePath = basePath;
    }
    this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
  }

  /**
   * @param consumes string[] mime-types
   * @return true: consumes contains 'multipart/form-data', false: otherwise
   */
  private canConsumeForm(consumes: string[]): boolean {
    const form = 'multipart/form-data';
    for (const consume of consumes) {
      if (form === consume) {
        return true;
      }
    }
    return false;
  }

  private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
    if (typeof value === 'object' && value instanceof Date === false) {
      httpParams = this.addToHttpParamsRecursive(httpParams, value);
    } else {
      httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
    }
    return httpParams;
  }

  private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
    if (value == null) {
      return httpParams;
    }

    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        (value as any[]).forEach(
          (elem) => (httpParams = this.addToHttpParamsRecursive(httpParams, elem, key))
        );
      } else if (value instanceof Date) {
        if (key != null) {
          httpParams = httpParams.append(key, (value as Date).toISOString().substr(0, 10));
        } else {
          throw Error('key may not be null if value is Date');
        }
      } else {
        Object.keys(value).forEach(
          (k) =>
            (httpParams = this.addToHttpParamsRecursive(
              httpParams,
              value[k],
              key != null ? `${key}.${k}` : k
            ))
        );
      }
    } else if (key != null) {
      httpParams = httpParams.append(key, value);
    } else {
      throw Error('key may not be null if value is not object or array');
    }
    return httpParams;
  }

  /**
   * @param requestParameters
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiCarsGet(
    requestParameters: ApiCarsGetRequestParams,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json' }
  ): Observable<CarListReadDtoPagingResponseDto>;
  public apiCarsGet(
    requestParameters: ApiCarsGetRequestParams,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json' }
  ): Observable<HttpResponse<CarListReadDtoPagingResponseDto>>;
  public apiCarsGet(
    requestParameters: ApiCarsGetRequestParams,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json' }
  ): Observable<HttpEvent<CarListReadDtoPagingResponseDto>>;
  public apiCarsGet(
    requestParameters: ApiCarsGetRequestParams,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json' }
  ): Observable<any> {
    const isAvailable = requestParameters.isAvailable;
    const isApproved = requestParameters.isApproved;
    const page = requestParameters.page;
    const limit = requestParameters.limit;
    const searchValue = requestParameters.searchValue;

    let queryParameters = new HttpParams({ encoder: this.encoder });
    if (isAvailable !== undefined && isAvailable !== null) {
      queryParameters = this.addToHttpParams(queryParameters, <any>isAvailable, 'IsAvailable');
    }
    if (isApproved !== undefined && isApproved !== null) {
      queryParameters = this.addToHttpParams(queryParameters, <any>isApproved, 'IsApproved');
    }
    if (page !== undefined && page !== null) {
      queryParameters = this.addToHttpParams(queryParameters, <any>page, 'Page');
    }
    if (limit !== undefined && limit !== null) {
      queryParameters = this.addToHttpParams(queryParameters, <any>limit, 'Limit');
    }
    if (searchValue !== undefined && searchValue !== null) {
      queryParameters = this.addToHttpParams(queryParameters, <any>searchValue, 'SearchValue');
    }

    let headers = this.defaultHeaders;

    // authentication (Bearer) required
    if (this.configuration.apiKeys) {
      const key: string | undefined =
        this.configuration.apiKeys['Bearer'] || this.configuration.apiKeys['Authorization'];
      if (key) {
        headers = headers.set('Authorization', key);
      }
    }

    let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['text/plain', 'application/json', 'text/json'];
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    let responseType: 'text' | 'json' = 'json';
    if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
      responseType = 'text';
    }

    return this.httpClient.get<CarListReadDtoPagingResponseDto>(
      `${this.configuration.basePath}/api/cars`,
      {
        params: queryParameters,
        responseType: <any>responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * @param requestParameters
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiCarsIdActivationPut(
    requestParameters: ApiCarsIdActivationPutRequestParams,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined }
  ): Observable<any>;
  public apiCarsIdActivationPut(
    requestParameters: ApiCarsIdActivationPutRequestParams,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined }
  ): Observable<HttpResponse<any>>;
  public apiCarsIdActivationPut(
    requestParameters: ApiCarsIdActivationPutRequestParams,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined }
  ): Observable<HttpEvent<any>>;
  public apiCarsIdActivationPut(
    requestParameters: ApiCarsIdActivationPutRequestParams,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: undefined }
  ): Observable<any> {
    const id = requestParameters.id;
    if (id === null || id === undefined) {
      throw new Error(
        'Required parameter id was null or undefined when calling apiCarsIdActivationPut.'
      );
    }
    const carActivationDto = requestParameters.carActivationDto;

    let headers = this.defaultHeaders;

    // authentication (Bearer) required
    if (this.configuration.apiKeys) {
      const key: string | undefined =
        this.configuration.apiKeys['Bearer'] || this.configuration.apiKeys['Authorization'];
      if (key) {
        headers = headers.set('Authorization', key);
      }
    }

    let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = [];
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
      'application/merge-patch+json',
      'application/json-patch+json',
      'application/json',
      'text/json',
      'application/_*+json'
    ];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(
      consumes
    );
    if (httpContentTypeSelected !== undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    let responseType: 'text' | 'json' = 'json';
    if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
      responseType = 'text';
    }

    return this.httpClient.put<any>(
      `${this.configuration.basePath}/api/cars/${encodeURIComponent(String(id))}/activation`,
      carActivationDto,
      {
        responseType: <any>responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * @param requestParameters
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiCarsIdApprovementPut(
    requestParameters: ApiCarsIdApprovementPutRequestParams,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined }
  ): Observable<any>;
  public apiCarsIdApprovementPut(
    requestParameters: ApiCarsIdApprovementPutRequestParams,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined }
  ): Observable<HttpResponse<any>>;
  public apiCarsIdApprovementPut(
    requestParameters: ApiCarsIdApprovementPutRequestParams,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined }
  ): Observable<HttpEvent<any>>;
  public apiCarsIdApprovementPut(
    requestParameters: ApiCarsIdApprovementPutRequestParams,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: undefined }
  ): Observable<any> {
    const id = requestParameters.id;
    if (id === null || id === undefined) {
      throw new Error(
        'Required parameter id was null or undefined when calling apiCarsIdApprovementPut.'
      );
    }
    const isApproved = requestParameters.isApproved;
    if (isApproved === null || isApproved === undefined) {
      throw new Error(
        'Required parameter isApproved was null or undefined when calling apiCarsIdApprovementPut.'
      );
    }
    const imageFile = requestParameters.imageFile;
    const name = requestParameters.name;
    const configFile = requestParameters.configFile;
    const managedBy = requestParameters.managedBy;

    let headers = this.defaultHeaders;

    // authentication (Bearer) required
    if (this.configuration.apiKeys) {
      const key: string | undefined =
        this.configuration.apiKeys['Bearer'] || this.configuration.apiKeys['Authorization'];
      if (key) {
        headers = headers.set('Authorization', key);
      }
    }

    let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = [];
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = ['multipart/form-data'];

    const canConsumeForm = this.canConsumeForm(consumes);

    let formParams: { append(param: string, value: any): any };
    let useForm = false;
    let convertFormParamsToString = false;
    // use FormData to transmit files using content-type "multipart/form-data"
    // see https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data
    useForm = canConsumeForm;
    // use FormData to transmit files using content-type "multipart/form-data"
    // see https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data
    useForm = canConsumeForm;
    if (useForm) {
      formParams = new FormData();
    } else {
      formParams = new HttpParams({ encoder: this.encoder });
    }

    if (isApproved !== undefined) {
      formParams = (formParams.append('IsApproved', <any>isApproved) as any) || formParams;
    }
    if (imageFile !== undefined) {
      formParams = (formParams.append('ImageFile', <any>imageFile) as any) || formParams;
    }
    if (name !== undefined) {
      formParams = (formParams.append('Name', <any>name) as any) || formParams;
    }
    if (configFile !== undefined) {
      formParams = (formParams.append('ConfigFile', <any>configFile) as any) || formParams;
    }
    if (managedBy !== undefined) {
      formParams = (formParams.append('ManagedBy', <any>managedBy) as any) || formParams;
    }

    let responseType: 'text' | 'json' = 'json';
    if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
      responseType = 'text';
    }

    return this.httpClient.put<any>(
      `${this.configuration.basePath}/api/cars/${encodeURIComponent(String(id))}/approvement`,
      convertFormParamsToString ? formParams.toString() : formParams,
      {
        responseType: <any>responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * @param requestParameters
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiCarsIdGet(
    requestParameters: ApiCarsIdGetRequestParams,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json' }
  ): Observable<CarReadDto>;
  public apiCarsIdGet(
    requestParameters: ApiCarsIdGetRequestParams,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json' }
  ): Observable<HttpResponse<CarReadDto>>;
  public apiCarsIdGet(
    requestParameters: ApiCarsIdGetRequestParams,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json' }
  ): Observable<HttpEvent<CarReadDto>>;
  public apiCarsIdGet(
    requestParameters: ApiCarsIdGetRequestParams,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: 'text/plain' | 'application/json' | 'text/json' }
  ): Observable<any> {
    const id = requestParameters.id;
    if (id === null || id === undefined) {
      throw new Error('Required parameter id was null or undefined when calling apiCarsIdGet.');
    }

    let headers = this.defaultHeaders;

    // authentication (Bearer) required
    if (this.configuration.apiKeys) {
      const key: string | undefined =
        this.configuration.apiKeys['Bearer'] || this.configuration.apiKeys['Authorization'];
      if (key) {
        headers = headers.set('Authorization', key);
      }
    }

    let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = ['text/plain', 'application/json', 'text/json'];
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    let responseType: 'text' | 'json' = 'json';
    if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
      responseType = 'text';
    }

    return this.httpClient.get<CarReadDto>(
      `${this.configuration.basePath}/api/cars/${encodeURIComponent(String(id))}`,
      {
        responseType: <any>responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * @param requestParameters
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiCarsManagedbyPut(
    requestParameters: ApiCarsManagedbyPutRequestParams,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined }
  ): Observable<any>;
  public apiCarsManagedbyPut(
    requestParameters: ApiCarsManagedbyPutRequestParams,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined }
  ): Observable<HttpResponse<any>>;
  public apiCarsManagedbyPut(
    requestParameters: ApiCarsManagedbyPutRequestParams,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined }
  ): Observable<HttpEvent<any>>;
  public apiCarsManagedbyPut(
    requestParameters: ApiCarsManagedbyPutRequestParams,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: undefined }
  ): Observable<any> {
    const carManagedByUpdateDto = requestParameters.carManagedByUpdateDto;

    let headers = this.defaultHeaders;

    // authentication (Bearer) required
    if (this.configuration.apiKeys) {
      const key: string | undefined =
        this.configuration.apiKeys['Bearer'] || this.configuration.apiKeys['Authorization'];
      if (key) {
        headers = headers.set('Authorization', key);
      }
    }

    let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = [];
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    // to determine the Content-Type header
    const consumes: string[] = [
      'application/merge-patch+json',
      'application/json-patch+json',
      'application/json',
      'text/json',
      'application/_*+json'
    ];
    const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(
      consumes
    );
    if (httpContentTypeSelected !== undefined) {
      headers = headers.set('Content-Type', httpContentTypeSelected);
    }

    let responseType: 'text' | 'json' = 'json';
    if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
      responseType = 'text';
    }

    return this.httpClient.put<any>(
      `${this.configuration.basePath}/api/cars/managedby`,
      carManagedByUpdateDto,
      {
        responseType: <any>responseType,
        withCredentials: this.configuration.withCredentials,
        headers: headers,
        observe: observe,
        reportProgress: reportProgress
      }
    );
  }

  /**
   * @param requestParameters
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public apiCarsPost(
    requestParameters: ApiCarsPostRequestParams,
    observe?: 'body',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined }
  ): Observable<any>;
  public apiCarsPost(
    requestParameters: ApiCarsPostRequestParams,
    observe?: 'response',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined }
  ): Observable<HttpResponse<any>>;
  public apiCarsPost(
    requestParameters: ApiCarsPostRequestParams,
    observe?: 'events',
    reportProgress?: boolean,
    options?: { httpHeaderAccept?: undefined }
  ): Observable<HttpEvent<any>>;
  public apiCarsPost(
    requestParameters: ApiCarsPostRequestParams,
    observe: any = 'body',
    reportProgress: boolean = false,
    options?: { httpHeaderAccept?: undefined }
  ): Observable<any> {
    const deviceId = requestParameters.deviceId;

    let queryParameters = new HttpParams({ encoder: this.encoder });
    if (deviceId !== undefined && deviceId !== null) {
      queryParameters = this.addToHttpParams(queryParameters, <any>deviceId, 'deviceId');
    }

    let headers = this.defaultHeaders;

    // authentication (Bearer) required
    if (this.configuration.apiKeys) {
      const key: string | undefined =
        this.configuration.apiKeys['Bearer'] || this.configuration.apiKeys['Authorization'];
      if (key) {
        headers = headers.set('Authorization', key);
      }
    }

    let httpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
    if (httpHeaderAcceptSelected === undefined) {
      // to determine the Accept header
      const httpHeaderAccepts: string[] = [];
      httpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
    }
    if (httpHeaderAcceptSelected !== undefined) {
      headers = headers.set('Accept', httpHeaderAcceptSelected);
    }

    let responseType: 'text' | 'json' = 'json';
    if (httpHeaderAcceptSelected && httpHeaderAcceptSelected.startsWith('text')) {
      responseType = 'text';
    }

    return this.httpClient.post<any>(`${this.configuration.basePath}/api/cars`, null, {
      params: queryParameters,
      responseType: <any>responseType,
      withCredentials: this.configuration.withCredentials,
      headers: headers,
      observe: observe,
      reportProgress: reportProgress
    });
  }
}
