const baseHost = 'http://localhost:3000';

Cypress.Commands.add('openPage', (pageUrl = '/') => {
  cy.visit(`${baseHost}${pageUrl}`);
});
