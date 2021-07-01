import { Configuration } from '@shared/api';
import { STATE_NAME as LOGIN_STATE_NAME } from '@shared/auth/login/data-access';
import { environment } from '../environments/environment';

export const getApiConfigFactory = () => {
  // NGXS LocalStorage Plugin sync the received token to localStorage stands by LoginState. Check `console.log(localStorage)` for more information.
  const token = JSON.parse(localStorage.getItem(LOGIN_STATE_NAME) || '{}')?.token;
  return new Configuration({
    basePath: environment.apiUrl,
    apiKeys: {
      Authorization: token ? `Bearer ${token}` : ''
    }
  });
};
