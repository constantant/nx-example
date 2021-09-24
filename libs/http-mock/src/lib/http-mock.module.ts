import { ModuleWithProviders, NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpMockSettings } from './http-mock.types';
import { HTTP_MOCK_SETTINGS } from './http-mock.tokens';
import { HttpMockInterceptor } from './http-mock.interceptor';

@NgModule()
export class HttpMockModule {
  static forRoot(settings: HttpMockSettings = { responses: [] }): ModuleWithProviders<HttpMockModule> {
    return {
      ngModule: HttpMockModule,
      providers: [
        {
          provide: HTTP_MOCK_SETTINGS,
          useValue: settings
        },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpMockInterceptor,
          multi: true
        }
      ]
    };
  }
}
