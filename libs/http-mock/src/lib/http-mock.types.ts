import { HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

export type HttpMockOutsideIn = Subject<HttpRequest<unknown>>;
export type HttpMockOutsideOut = Observable<HttpEvent<unknown>>;

export interface HttpMockResponse {
  match(request: HttpRequest<unknown>): boolean;

  response(request: HttpRequest<unknown>): Observable<HttpEvent<unknown>>;
}

export interface HttpMockSettings {
  responses: HttpMockResponse[];
  removeUsed?: boolean;
}
