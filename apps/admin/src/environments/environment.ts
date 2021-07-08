import { AppConfig } from '@shared/app-config';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const environment: AppConfig = (window as any).__env__ ?? {
  apiUrl: 'https://avc-api.azurewebsites.net',
  production: true
};
