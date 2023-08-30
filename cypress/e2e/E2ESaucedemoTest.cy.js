import { Sauce } from '../../pageObjects/Saucedemo'; // Adjust the path as needed
describe('template spec', () => {
  it('passes', () => {
    // login success
    Sauce.visitLoginPage()
    Sauce.submitLoginSucessful('standard_user', 'secret_sauce')
    cy.url().should((url) => {
      expect(url).to.contains('/inventory.html')
    })
    //add two products
    const productNames = [
      "Sauce Labs Backpack",
      "Sauce Labs Onesie",
    ]
    // for (const productName of productNames) {
    //   cy.get(Sauce.itemName).contains(productName).parents(Sauce.itemDescription).find(Sauce.btn).click()
    // }
    productNames.forEach((productName) => {
     cy.get('.inventory_item_name')
        .contains(productName)
        .parents('.inventory_item_description')
        .find('.btn')
        .click();
    });
    cy.get('a.shopping_cart_link').should('have.text', 2)

    //check cart information
    cy.get('a.shopping_cart_link').click();

    cy.get('.inventory_item_name').invoke('text').then((text) => {
      cy.log(text);
    });
    const cartItemNames = cy.get('.inventory_item_name')
  })
})