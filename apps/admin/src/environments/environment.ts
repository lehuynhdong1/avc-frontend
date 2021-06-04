import { AppConfig } from '@shared/app-config';
declare const window: { process: { env: AppConfig } };

export const environment: AppConfig = {
  production: window.process?.env.production || false,
  apiUrl: window.process?.env.apiUrl || 'https://avc-api.azurewebsites.net'
};
