import { HttpContext, HttpEvent, HttpHeaders, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { NgZone } from '@angular/core';

export type HttpMockOutsideIn = Subject<HttpRequest<unknown>>;
export type HttpMockOutsideOut = Observable<HttpEvent<unknown>>;

export interface HttpMockResponse {
  match(request: HttpRequest<unknown>): boolean;

  response(request: HttpRequest<unknown>): Observable<HttpEvent<unknown>>;
}

export interface HttpMockSettings {
  responses?: HttpMockResponse[];
  removeUsed?: boolean;
  useGlobal?: boolean;
}

export interface HttpMockGlobal {
  httpMockGlobalIn: HttpMockOutsideIn;
  httpMockGlobalOut: HttpMockOutsideOut;
  httpMockGlobalEmit: (httpEvent: HttpEvent<unknown>) => void;
  httpMockGlobalUtils: {
    ngZone: NgZone,
    HttpRequest: {
      new(method: 'DELETE' | 'GET' | 'HEAD' | 'JSONP' | 'OPTIONS', url: string, init?: {
        headers?: HttpHeaders;
        context?: HttpContext;
        reportProgress?: boolean;
        params?: HttpParams;
        responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
        withCredentials?: boolean;
      }): HttpRequest<unknown>;
      new(method: 'POST' | 'PUT' | 'PATCH', url: string, body: unknown | null, init?: {
        headers?: HttpHeaders;
        context?: HttpContext;
        reportProgress?: boolean;
        params?: HttpParams;
        responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
        withCredentials?: boolean;
      }): HttpRequest<unknown>;
      new(method: string, url: string, body: unknown | null, init?: {
        headers?: HttpHeaders;
        context?: HttpContext;
        reportProgress?: boolean;
        params?: HttpParams;
        responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
        withCredentials?: boolean;
      }): HttpRequest<unknown>;
    };
    HttpHeaders: { new(): HttpHeaders; };
    HttpParams: { new(): HttpParams; };
    HttpResponse: { new(): HttpResponse<unknown>; };
  };
}
