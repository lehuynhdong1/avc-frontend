import { Configuration } from './generated/configuration';
import { Store } from '@ngxs/store';
import { LoginState } from '@shared/auth/login/data-access';
import { AppConfig } from '@shared/app-config';

export const getApiProvider = (config: AppConfig) => {
  return {
    provide: Configuration,
    useFactory: (store: Store) => {
      const token = store.selectSnapshot(LoginState.token);
      return new Configuration({
        basePath: config.apiUrl,
        apiKeys: {
          Authorization: token ? `Bearer ${token}` : ''
        }
      });
    },
    deps: [Store],
    multi: false
  };
};
