import { Sauce } from '../../pageObjects/Saucedemo';

describe('E2E Test', () => {
  it('Login, Add two products, Checkout and Validations', () => {
    // login success
    Sauce.visitLoginPage()
    Sauce.submitLoginSucessful('standard_user', 'secret_sauce')
    cy.url().should((url) => {
      expect(url).to.contains('/inventory.html')
    })
    // Add two products
    Sauce.addItemsToCartByList(Sauce.productNames)
    cy.get('a.shopping_cart_link').should('have.text', 2)
    //check cart information
    cy.get('a.shopping_cart_link').click();
    cy.get('.inventory_item_name').each(($element) => {
      expect(Sauce.productNames).to.include($element.text())
    });
    //Check out part one
    cy.clickBtnByText('Checkout')
    cy.get(Sauce.fistNameField).type("Ricardo");
    cy.get(Sauce.lastNameField).type("Osegueda");
    cy.get(Sauce.zipPostalCodeField).type("CP 1502");
    cy.get(Sauce.continueBtn).click();
    //Check out part two
    let totalPrice = 0;
    cy.get(Sauce.inventoryItemPrices).its('length').then((count) => {
      cy.log(count);
    });
  })
})