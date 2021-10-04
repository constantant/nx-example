import { HttpResponse } from '@angular/common/http';

describe('lib-two', () => {
  beforeEach(() => cy.visit('/iframe.html?id=libtwocomponent--end-to-end-mocks'));
  it('should remove an item from the list successfully', () => {
    cy.expectRequest(({ method }) => method === 'GET')
      .get('nx-example-lib-two p').first().should('have.text', 'Loading...')
      .sendResponse(new HttpResponse({ body: [ '123', '456' ] }))
      .get('nx-example-lib-two').children('nx-example-item').should('have.length', 2)
      .get('nx-example-lib-two nx-example-item').first().children('button').first().click()
      .expectRequest(({ method }) => method === 'DELETE')
      .sendResponse(new HttpResponse({ body: { success: true } }))
      .expectRequest(({ method }) => method === 'GET')
      .get('nx-example-lib-two p').first().should('have.text', 'Loading...')
      .sendResponse(new HttpResponse({ body: [ '456' ] }))
      .get('nx-example-lib-two').children('nx-example-item').should('have.length', 1);
  });
});
