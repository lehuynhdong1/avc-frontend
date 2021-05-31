import { InjectionToken, Provider } from '@angular/core';
export interface AppConfig {
  production: boolean;
  apiUrl: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('Shared App Config');

export const getAppConfigProvider = (appConfig: AppConfig): Provider => ({
  provide: APP_CONFIG,
  useValue: appConfig
});
