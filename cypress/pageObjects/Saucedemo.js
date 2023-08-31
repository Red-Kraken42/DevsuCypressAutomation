class Saucedemo {
    expectedHeaderConfirmationMessage = "Thank you for your order!"
    expectedCompleteConfirmationMessage = "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
    usernameField = 'input[data-test="username"]';
    passwordField = 'input[data-test="password"]';
    loginBtn = 'input[data-test="login-button"]';
    shoppingCartIcon = 'a.shopping_cart_link';
    btn = 'button'
    text = 'text'
    cartItem = 'div.cart_item'
    itemName = '.inventory_item_name'
    itemDescription = '.inventory_item_description'
    fistNameField = 'input[data-test="firstName"]'
    lastNameField = 'input[data-test="lastName"]'
    zipPostalCodeField = 'input[data-test="postalCode"]'
    continueBtn = 'input[data-test="continue"]'
    inventoryItemPrices = 'div.inventory_item_price'
    subtotalPrice = 'div.summary_subtotal_label'
    headerConfirmationMsg = 'h2.complete-header'
    completeConfirmationMsg = 'div.complete-text'

    productNames = [
        "Sauce Labs Backpack",
        "Sauce Labs Onesie",
    ]

    // Login Page:
    visitLoginPage() {
        cy.visit('https://www.saucedemo.com/');
    }
    submitLoginSucessful(username, password) {
        cy.get(this.usernameField).type(username);
        cy.get(this.passwordField).type(password);
        cy.get(this.loginBtn).click();
    }
    // Inventory Page:
    addItemsToCartByList(productNames) {
        productNames.forEach((productName) => {
            cy.get(this.itemName)
                .contains(productName)
                .parents(this.itemDescription)
                .find(this.btn)
                .click();
        });
    }
    //check out page 1:
    fillCheckOutInformation(firstName, lastName, zipPostalCode) {
        cy.get(this.fistNameField).type(firstName);
        cy.get(this.lastNameField).type(lastName);
        cy.get(this.zipPostalCodeField).type(zipPostalCode);
        cy.get(this.continueBtn).click();
    }

    //check out page 2:
    calculateTotalSum() {
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

    extractSubtotalNumber() {
        return new Cypress.Promise((resolve) => {
            cy.get(Sauce.subtotalPrice).invoke(this.text).then((subtotalText) => {
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
}

export const Sauce = new Saucedemo()