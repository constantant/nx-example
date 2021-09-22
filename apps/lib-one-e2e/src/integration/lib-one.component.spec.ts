describe('lib-one', () => {
  beforeEach(() => cy.visit('/iframe.html?id=libonecomponent--primary'));
  it('should render the component', () => {
    cy.get('nx-example-lib-one').should('exist');
  });
  it('should render the input', () => {
    cy.get('nx-example-lib-one input').should('exist');
  });
  it('should have 2 items', () => {
    cy.get('nx-example-lib-one ul').children().should('have.length', 2);
  });
  it('should add an item "hello world"', () => {
    cy.get('nx-example-lib-one input').type('hello world');
    cy.get('nx-example-lib-one button').click();
    cy.get('nx-example-lib-one ul').children().should('have.length', 3);
  });
});
