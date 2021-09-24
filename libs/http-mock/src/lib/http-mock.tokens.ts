import { InjectionToken } from '@angular/core';
import { HttpMockOutsideIn, HttpMockOutsideOut, HttpMockSettings } from './http-mock.types';

export const HTTP_MOCK_SETTINGS: InjectionToken<HttpMockSettings> = new InjectionToken<HttpMockSettings>('HTTP_MOCK_SETTINGS');

export const HTTP_MOCK_OUTSIDE_IN: InjectionToken<HttpMockOutsideIn> = new InjectionToken<HttpMockOutsideIn>('HTTP_MOCK_OUTSIDE_IN');

export const HTTP_MOCK_OUTSIDE_OUT: InjectionToken<HttpMockOutsideOut> = new InjectionToken<HttpMockOutsideOut>('HTTP_MOCK_OUTSIDE_OUT');
