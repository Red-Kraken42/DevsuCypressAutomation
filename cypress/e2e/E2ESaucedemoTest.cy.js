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
    function calculateTotalSum() {
      return new Cypress.Promise((resolve) => {
        let totalSum = 0;
        cy.get(Sauce.inventoryItemPrices).each(($element) => {
          const itemPriceText = $element.text();
          const itemPriceNumber = parseFloat(itemPriceText.replace('$', ''));
          totalSum += itemPriceNumber;
        }).then(() => {
          resolve(totalSum);
        });
      });
    }

    function extractSubtotalNumber() {
      return new Cypress.Promise((resolve) => {
        cy.get(Sauce.subtotalPrice).invoke('text').then((subtotalText) => {
          const regex = /\d+\.\d+/;
          const matches = subtotalText.match(regex);
          if (matches && matches.length > 0) {
            const firstMatch = parseFloat(matches[0]);
            resolve(firstMatch);
          } else {
            resolve(null);
          }
        })
      })
    }
    calculateTotalSum().then((totalSum) => {
      extractSubtotalNumber().then((subtotalPrice) => {
        expect(totalSum).to.be.equal(subtotalPrice)
      })
    });
    //validate confirmation message
    
  })
})