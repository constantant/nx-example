describe('app-two', () => {
  it('should display lib one', () => {
    cy.visit('/')
      .get('nx-example-lib-one').should('exist');
  });
  it('should display lib two', () => {
    cy.visit('/two')
      .get('nx-example-lib-two').should('exist');
  });
});
