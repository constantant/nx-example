// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import { HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';

import { httpMockRequestIdHeaderKey } from './http-mock.interceptor';
import { HttpMockGlobal } from './http-mock.types';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends HttpMockGlobal {}

// eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Chainable<Subject> {
      expectRequest(expect: (request: HttpRequest<unknown>) => boolean): Chainable<HttpRequest<unknown>>;

      sendResponse(response: HttpEvent<unknown>): Chainable<HttpRequest<unknown>>;
    }
  }
}

Cypress.Commands.add('expectRequest', (expect: (request: HttpRequest<unknown>) => boolean) => {
  return cy.window().then(win => win.httpMockGlobalIn
    .pipe(take(1)).toPromise()).should('satisfy', expect);
});

Cypress.Commands.add('sendResponse', { prevSubject: true }, (request: HttpRequest<unknown>, {
  headers,
  status,
  statusText,
  url,
  body
}: HttpResponse<unknown>) => {
  return cy.window().then(win => {
    const { ngZone, HttpResponse } = win.httpMockGlobalUtils;
    ngZone.run(() => {
      const requestId = request.headers.get(httpMockRequestIdHeaderKey);
      win.httpMockGlobalEmit(new HttpResponse().clone({
        headers: requestId ? headers.append(httpMockRequestIdHeaderKey, requestId) : headers,
        body,
        status,
        statusText,
        url: url as string
      }));
    });
    return Promise.resolve(request);
  });
});

