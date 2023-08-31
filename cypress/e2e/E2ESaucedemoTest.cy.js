import { Sauce } from '../pageObjects/Saucedemo';
import loginCredentials from '../fixtures/loginCredentials.json';
import { Constants } from '../support/Constants';

describe('E2E Test', () => {
  it('Login, Add two products, Checkout and Validations', () => {
    // login success
    Sauce.visitLoginPage()
    Sauce.submitLoginSucessful(loginCredentials[0].username, loginCredentials[0].password)
    cy.url().should((url) => {
      expect(url).to.contains(Constants.INVENTORY_HTML)
    })
    // Add two products
    Sauce.addItemsToCartByList(Sauce.productNames)
    cy.get(Sauce.shoppingCartIcon).should(Constants.HAVE_TEXT,2)
    //check cart information
    cy.get(Sauce.shoppingCartIcon).click();
    cy.get(Sauce.itemName).each(($element) => {
      expect(Sauce.productNames).to.include($element.text())
    });
    //Check out part one
    cy.clickBtnByText(Constants.CHECKOUT)
    Sauce.fillCheckOutInformation(Constants.RICARDO, Constants.OSEGUEDA, Constants.CP_1502)
    //Check out part two
    Sauce.calculateTotalSum().then((totalSum) => {
      Sauce.extractSubtotalNumber().then((subtotalPrice) => {
        expect(totalSum).to.be.equal(subtotalPrice)
      })
    });
    cy.clickBtnByText(Constants.FINISH)
    //validate confirmation message
    cy.get(Sauce.headerConfirmationMsg).should(Constants.HAVE_TEXT, Sauce.expectedHeaderConfirmationMessage);
    cy.get(Sauce.completeConfirmationMsg).should(Constants.HAVE_TEXT, Sauce.expectedCompleteConfirmationMessage);
  })
})