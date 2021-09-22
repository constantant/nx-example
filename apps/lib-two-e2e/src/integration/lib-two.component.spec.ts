describe('lib-two', () => {
  beforeEach(() => cy.visit('/iframe.html?id=libtwocomponent--primary'));
  it('should render the component', () => {
    cy.get('nx-example-lib-two').should('exist');
  });
  it('should have 2 items', () => {
    cy.get('nx-example-lib-two').children('nx-example-item').should('have.length', 2);
  });
  it('should delete an item', () => {
    cy.get('nx-example-lib-two nx-example-item').first().children('button').first().click();
    cy.get('nx-example-lib-two').children('nx-example-item').should('have.length', 1);
  });
});
