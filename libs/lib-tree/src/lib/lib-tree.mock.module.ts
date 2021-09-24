import { ModuleWithProviders, NgModule } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

import { of, Subject } from 'rxjs';
import { delay, filter, switchMap } from 'rxjs/operators';

import { HTTP_MOCK_OUTSIDE_IN, HTTP_MOCK_OUTSIDE_OUT } from '@nx-example/http-mock';


const store: string[] = [ 'Hello', 'world' ];
const httpMockOutsideIn = new Subject<HttpRequest<unknown>>();
const httpMockOutsideOut = httpMockOutsideIn.pipe(
  switchMap(({ method, url, body, headers }: HttpRequest<unknown>) => {
    if (url === '@lib-tree-api/items') {
      switch (method) {
        case 'GET': {
          return of(new HttpResponse({ body: [ ...store ], status: 200, headers })).pipe(
            delay(Math.random() * 1000)
          );
        }
        case 'POST': {
          store.push(body as string);
          return of(new HttpResponse({ body: { success: true }, status: 201, headers }));
        }
      }
    }
    const itemMatch = url.match(/^@lib-tree-api\/items\/(.*)$/);
    if (itemMatch && method === 'DELETE') {
      const [ , index ] = itemMatch;
      store.splice(Number(index), 1);
      return of(new HttpResponse({ body: { success: true }, status: 200, headers }));
    }
    return of(new HttpResponse());
  }),
  filter(({ body }: HttpResponse<unknown>) => body !== undefined)
);

@NgModule()
export class LibTreeMockModule {
  static forRoot(): ModuleWithProviders<LibTreeMockModule> {
    return {
      ngModule: LibTreeMockModule,
      providers: [
        {
          provide: HTTP_MOCK_OUTSIDE_IN,
          useValue: httpMockOutsideIn,
          multi: true
        },
        {
          provide: HTTP_MOCK_OUTSIDE_OUT,
          useValue: httpMockOutsideOut,
          multi: true
        }
      ]
    };
  }
}
