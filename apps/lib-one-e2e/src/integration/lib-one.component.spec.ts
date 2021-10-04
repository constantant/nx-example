import { HttpRequest, HttpResponse } from '@angular/common/http';

describe('lib-one', () => {
  beforeEach(() => cy.visit('/iframe.html?id=libonecomponent--end-to-end-mocks'));
  it('should add an item to the list successfully', () => {
    const items = [ '123', '456' ];
    const text = 'hello world';
    cy.get('nx-example-lib-one').should('exist')
      .expectRequest(({ method }: HttpRequest<unknown>) => method === 'GET')
      .get('nx-example-lib-one ul').children().should('have.length', 1)
      .get('nx-example-lib-one ul li').last().should('have.text', 'Loading...')
      .sendResponse(new HttpResponse({ body: items }))
      .get('nx-example-lib-one ul').children().should('have.length', 2)
      .get('nx-example-lib-one input').type(text)
      .get('nx-example-lib-one button').click()
      .expectRequest(({ method, body }: HttpRequest<unknown>) => method === 'POST' && body === text)
      .sendResponse(new HttpResponse({ body: { success: true } }))
      .expectRequest(({ method }: HttpRequest<unknown>) => method === 'GET')
      .get('nx-example-lib-one ul').children().should('have.length', 3)
      .get('nx-example-lib-one ul li').last().should('have.text', 'Loading...')
      .sendResponse(new HttpResponse({ body: [ ...items, text ] }))
      .get('nx-example-lib-one ul').children().should('have.length', 3)
      .get('nx-example-lib-one ul li').last().should('have.text', text);
  });
});
