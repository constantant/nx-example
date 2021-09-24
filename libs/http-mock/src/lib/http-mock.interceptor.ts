import { Inject, Injectable, Optional } from '@angular/core';
import { HttpEvent, HttpEventType, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';

import { combineLatest, merge, Observable, of, Subject, throwError } from 'rxjs';
import { delay, filter, map, takeUntil, tap } from 'rxjs/operators';

import { HTTP_MOCK_OUTSIDE_IN, HTTP_MOCK_OUTSIDE_OUT, HTTP_MOCK_SETTINGS } from './http-mock.tokens';
import { HttpMockOutsideIn, HttpMockOutsideOut, HttpMockSettings } from './http-mock.types';

let requestId = 0;
let colorIndex = -1;
const colors = [ '#005078', '#002278', '#004478', '#001678', '#003878', '#000a78' ];
const getColor = () => colors[ colorIndex === 5 ? (colorIndex = 0) : ++colorIndex ];
export const httpMockRequestIdHeaderKey = 'x-mock-request-id';

@Injectable()
export class HttpMockInterceptor implements HttpInterceptor {
  constructor(
    @Inject(HTTP_MOCK_SETTINGS) private readonly settings: HttpMockSettings,
    @Optional() @Inject(HTTP_MOCK_OUTSIDE_IN) private readonly outsideIn: HttpMockOutsideIn | HttpMockOutsideIn[],
    @Optional() @Inject(HTTP_MOCK_OUTSIDE_OUT) private readonly outsideOut: HttpMockOutsideOut | HttpMockOutsideOut[]
  ) {}

  intercept(request: HttpRequest<unknown>): Observable<HttpEvent<unknown>> {
    const id = requestId++;
    const style = `background-color: ${getColor()}`;
    const req = request.clone({ headers: new HttpHeaders({ [ httpMockRequestIdHeaderKey ]: `${id}` }) });
    console.log(`%c [${id}] ${req.method} ${req.url}\n`, style, req);
    const { responses, removeUsed } = this.settings;
    const response = responses.find(response => response.match(req));
    if (response) {
      return response.response(req).pipe(
        tap((ev: HttpEvent<unknown>) => {
          if (removeUsed) {
            responses.splice(responses.indexOf(response), 1);
          }
          console.log(`%c [${id}] HttpEvent: ${ev?.type}\n`, style, ev);
        })
      );
    }
    if (this.outsideIn && this.outsideOut) {
      return this.getOutside(req, id, style);
    }
    return throwError(`There is no mock for ${req.method} ${req.url} [${id}]`);
  }

  private getOutside(req: HttpRequest<unknown>, id: number, style: string): Observable<HttpEvent<unknown>> {
    const stop: Subject<void> = new Subject();
    return combineLatest([
      this.getOutsideOut().pipe(
        filter((ev: HttpEvent<unknown>) => {
          if (ev instanceof HttpResponse) {
            return Number(ev.headers.get(httpMockRequestIdHeaderKey)) === id;
          }
          return true;
        }),
        takeUntil(stop),
        tap((ev: HttpEvent<unknown>) => {
          console.log(`%c [${id}] ${HttpEventType[ ev.type ]}\n`, style, ev);
        })
      ),
      of(void 0).pipe(tap(() => this.emitOutsideIn(req)))
    ]).pipe(
      map(([ ev ]) => ev),
      tap((ev: HttpEvent<unknown>) => {
        of(void 0).pipe(delay(0)).subscribe(() => {
          if (ev.type === HttpEventType.Response) {
            stop.next();
            stop.complete();
          }
        });
      })
    );
  }

  private emitOutsideIn(req: HttpRequest<unknown>): void {
    Array.isArray(this.outsideIn)
      ? this.outsideIn.forEach(oIn => oIn.next(req))
      : this.outsideIn.next(req);
  }

  private getOutsideOut(): Observable<HttpEvent<unknown>> {
    return Array.isArray(this.outsideOut)
      ? merge(...this.outsideOut)
      : this.outsideOut;
  }
}
