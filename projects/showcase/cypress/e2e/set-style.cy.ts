import { E2eDriver } from './driver';

describe('Set style', () => {
  const driver = new E2eDriver();
  it('should change the style', () => {
    console.warn = () => {};
    cy.visit('/demo/set-style');
    cy.wait(20000);
    cy.get('canvas').should('exist');
    driver.initReferenceImage();
    cy.get('mat-radio-button').contains('from code').click();
    cy.wait(10000);
    driver.compareToReference().should('be.greaterThan', 0);
    cy.get('mat-radio-button').contains('streets').click();
    cy.wait(20000);
    cy.window().then((win) => {
      (win.console.warn as any).restore();
      cy.spy(win.console, 'warn');
    });
    driver.compareToReference().should('equal', 0);
  });
});
