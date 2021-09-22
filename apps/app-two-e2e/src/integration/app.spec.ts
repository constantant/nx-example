describe('app-two', () => {
  it('should display lib one', () => {
    cy.visit('/');
    cy.get('nx-example-lib-one').should('exist');
  });
  it('should display lib two', () => {
    cy.visit('/two');
    cy.get('nx-example-lib-two').should('exist');
  });
});
