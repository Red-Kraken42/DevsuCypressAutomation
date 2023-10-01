class Saucedemo {

    constructor() {
        this.urls = {
            saucedemo: 'https://www.saucedemo.com/',
        };
        this.productNames = [
            "Sauce Labs Backpack",
            "Sauce Labs Onesie",
        ];

        this.expectedHeaderConfirmationMessage = "Thank you for your order!"
        this.expectedCompleteConfirmationMessage = "Your order has been dispatched, and will arrive just as fast as the pony can get there!"
        this.usernameField = 'input[data-test="username"]';
        this.passwordField = 'input[data-test="password"]';
        this.loginBtn = 'input[data-test="login-button"]';
        this.shoppingCartIcon = 'a.shopping_cart_link';
        this.btn = 'button'
        this.text = 'text'
        this.cartItem = 'div.cart_item'
        this.itemName = '.inventory_item_name'
        this.itemDescription = '.inventory_item_description'
        this.fistNameField = 'input[data-test="firstName"]'
        this.lastNameField = 'input[data-test="lastName"]'
        this.zipPostalCodeField = 'input[data-test="postalCode"]'
        this.continueBtn = 'input[data-test="continue"]'
        this.inventoryItemPrices = 'div.inventory_item_price'
        this.subtotalPrice = 'div.summary_subtotal_label'
        this.headerConfirmationMsg = 'h2.complete-header'
        this.completeConfirmationMsg = 'div.complete-text'

    }

    // Login Page:
    visitLoginPage() {
        cy.visit(this.urls.saucedemo);

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