import { Inject, Injectable, NgZone, Optional } from '@angular/core';
import { HttpEvent, HttpEventType, HttpHeaders, HttpInterceptor, HttpParams, HttpRequest, HttpResponse } from '@angular/common/http';

import { combineLatest, merge, Observable, of, Subject, throwError } from 'rxjs';
import { delay, map, takeUntil, tap } from 'rxjs/operators';

import { ReplayQueueSubject } from './ReplayQueueSubject';

import { HTTP_MOCK_OUTSIDE_IN, HTTP_MOCK_OUTSIDE_OUT, HTTP_MOCK_SETTINGS } from './http-mock.tokens';
import { HttpMockGlobal, HttpMockOutsideIn, HttpMockOutsideOut, HttpMockSettings } from './http-mock.types';

let requestId = 0;
let colorIndex = -1;
const colors = [ '#005078', '#002278', '#004478', '#001678', '#003878', '#000a78' ];
const getColor = () => colors[ colorIndex === 5 ? (colorIndex = 0) : ++colorIndex ];
export const httpMockRequestIdHeaderKey = 'x-mock-request-id';

export const httpMockGlobalIn = (ngZone: NgZone): HttpMockOutsideIn => {
  const httpMockGlobal = window as unknown as HttpMockGlobal;
  if (!httpMockGlobal.httpMockGlobalIn) {
    httpMockGlobal.httpMockGlobalUtils = { ngZone, HttpRequest, HttpHeaders, HttpParams, HttpResponse };
    httpMockGlobal.httpMockGlobalIn = new ReplayQueueSubject<HttpRequest<unknown>>(1);
  }
  return httpMockGlobal.httpMockGlobalIn;
};

export const httpMockGlobalOut = (): HttpMockOutsideOut => {
  const httpMockGlobal = window as unknown as HttpMockGlobal;
  if (!httpMockGlobal.httpMockGlobalOut) {
    httpMockGlobal.httpMockGlobalOut = new Observable<HttpEvent<unknown>>(subscriber => {
      httpMockGlobal.httpMockGlobalEmit = (ev: HttpEvent<unknown>) => subscriber.next(ev);
    });
  }
  return httpMockGlobal.httpMockGlobalOut;
};

const logHttpEvent = (id: number, ev: HttpEvent<unknown>, style: string): void => console.log(`%c [${id}] HttpEvent: ${
  HttpEventType[ ev.type ]
}\n`, style, ev);

@Injectable()
export class HttpMockInterceptor implements HttpInterceptor {
  private readonly httpMockGlobalIn?: HttpMockOutsideIn = this.settings.useGlobal ? httpMockGlobalIn(this.ngZone) : void 0;
  private readonly httpMockGlobalOut?: HttpMockOutsideOut = this.settings.useGlobal ? httpMockGlobalOut() : void 0;

  constructor(
    private readonly ngZone: NgZone,
    @Inject(HTTP_MOCK_SETTINGS) private readonly settings: HttpMockSettings,
    @Optional() @Inject(HTTP_MOCK_OUTSIDE_IN) private readonly outsideIn: HttpMockOutsideIn | HttpMockOutsideIn[],
    @Optional() @Inject(HTTP_MOCK_OUTSIDE_OUT) private readonly outsideOut: HttpMockOutsideOut | HttpMockOutsideOut[]
  ) {}

  intercept(request: HttpRequest<unknown>): Observable<HttpEvent<unknown>> {
    const id = requestId++;
    const style = `background-color: ${getColor()}`;
    const req = request.clone({ headers: new HttpHeaders({ [ httpMockRequestIdHeaderKey ]: `${id}` }) });
    console.log(`%c [${id}] ${req.method} ${req.url}\n`, style, req);
    const { responses, removeUsed, useGlobal } = this.settings;
    const response = responses?.find(response => response.match(req));
    if (responses && response) {
      return response.response(req).pipe(
        tap((ev: HttpEvent<unknown>) => {
          if (removeUsed) {
            responses.splice(responses.indexOf(response), 1);
          }
          logHttpEvent(id, ev, style);
        })
      );
    }
    if (useGlobal || (this.outsideIn && this.outsideOut)) {
      return this.getOutside(req, id, style);
    }
    return throwError(`There is no mock for ${req.method} ${req.url} [${id}]`);
  }

  private getOutside(req: HttpRequest<unknown>, id: number, style: string): Observable<HttpEvent<unknown>> {
    const stop: Subject<void> = new Subject();
    return combineLatest([
      this.getOutsideOut(),
      of(void 0).pipe(delay(0), tap(() => this.emitOutsideIn(req)))
    ]).pipe(
      takeUntil(stop),
      map(([ ev ]) => ev),
      tap((ev: HttpEvent<unknown>) => {
        of(void 0).pipe(delay(0)).subscribe(() => {
          if (ev.type === HttpEventType.Response) {
            stop.next();
            stop.complete();
          }
        });
        logHttpEvent(id, ev, style);
      })
    );
  }

  private emitOutsideIn(req: HttpRequest<unknown>): void {
    if (this.httpMockGlobalIn) {
      this.httpMockGlobalIn.next(req);
      return;
    }
    Array.isArray(this.outsideIn)
      ? this.outsideIn.forEach(oIn => oIn.next(req))
      : this.outsideIn.next(req);
  }

  private getOutsideOut(): Observable<HttpEvent<unknown>> {
    if (this.httpMockGlobalOut) {
      return this.httpMockGlobalOut;
    }
    return Array.isArray(this.outsideOut)
      ? merge(...this.outsideOut)
      : this.outsideOut;
  }
}
