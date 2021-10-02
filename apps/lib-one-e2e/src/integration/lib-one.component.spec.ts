import { HttpRequest, HttpResponse } from '@angular/common/http';

describe('lib-one', () => {
  beforeEach(() => cy.visit('/iframe.html?id=libonecomponent--end-to-end-mocks'));
  it('should render the component', () => {
    cy.get('nx-example-lib-one').should('exist');
  });
  it('should render the input', () => {
    cy.get('nx-example-lib-one input').should('exist');
  });
  it('should have 2 items', () => {
    cy.expectRequest(({ method }: HttpRequest<unknown>) => method === 'GET')
      .sendResponse(new HttpResponse({ body: [ '123', '456' ] }));
    cy.get('nx-example-lib-one ul').children().should('have.length', 2);
  });
  it('should add an item "hello world"', () => {
    const text = 'hello world';

    cy.expectRequest(({ method }: HttpRequest<unknown>) => method === 'GET')
      .sendResponse(new HttpResponse({ body: [ '1', '2' ] }));

    cy.get('nx-example-lib-one input').type(text);
    cy.get('nx-example-lib-one button').click();

    cy.expectRequest(({ method, body }: HttpRequest<unknown>) => method === 'POST' && body === text)
      .sendResponse(new HttpResponse({ body: { success: true } }));

    cy.expectRequest(({ method }: HttpRequest<unknown>) => method === 'GET')
      .sendResponse(new HttpResponse({ body: [ '1', '2', text ] }));

    cy.get('nx-example-lib-one ul').children().should('have.length', 3);
  });
});
