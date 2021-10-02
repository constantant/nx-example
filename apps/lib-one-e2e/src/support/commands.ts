// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

import { HttpMockGlobal } from '@nx-example/http-mock';
import { HttpEvent, HttpRequest, HttpResponse } from '@angular/common/http';
import { take } from 'rxjs/operators';

declare global {
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
  return cy.window().then((win: HttpMockGlobal) => win.httpMockGlobalIn
    .pipe(take(1)).toPromise()).should('satisfy', expect);
});

Cypress.Commands.add('sendResponse', { prevSubject: true }, (request: HttpRequest<unknown>, {
  headers,
  status,
  statusText,
  url,
  body
}: HttpResponse<unknown>) => {
  return cy.window().then((win: HttpMockGlobal) => {
    const { ngZone, HttpResponse } = win.httpMockGlobalUtils;
    ngZone.run(() => {
      win.httpMockGlobalEmit(new HttpResponse().clone({ body, headers, status, statusText, url }));
    });
    return Promise.resolve(request);
  });
});

