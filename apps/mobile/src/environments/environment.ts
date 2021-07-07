import { AppConfig } from '@shared/app-config';

export const environment: AppConfig = (window as any).__env__ ?? {
  production: true,
  apiUrl: 'https://avc-api.azurewebsites.net'
};
