import { HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { AppConfig } from '@shared/app-config';
import { getApiProvider } from './api.provider';
import { OpenApiModule } from './generated/api.module';

@NgModule({
  imports: [HttpClientModule, OpenApiModule]
})
export class ApiModule {
  static forRoot(config: AppConfig): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [getApiProvider(config)]
    };
  }
}
