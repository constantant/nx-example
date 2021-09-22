describe('app-one', () => {
  beforeEach(() => cy.visit('/'));

  it('should display lib one', () => {
    cy.get('nx-example-lib-one').should('exist');
  });
});
