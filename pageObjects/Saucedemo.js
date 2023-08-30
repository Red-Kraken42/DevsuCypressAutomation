class Saucedemo {
    usernameField = 'input[data-test="username"]';
    passwordField = 'input[data-test="password"]';
    loginBtn = 'input[data-test="login-button"]';
    shoppingCartIcon = 'a.shopping_cart_link';
    btn = 'button'
    cartItem = 'div.cart_item'
    itemName = '.inventory_item_name'
    // cartItemNames = 'div.cart_item'.locator('.inventory_item_name')
    fistNameField = 'input[data-test="firstName"]'
    lastNameField = 'input[data-test="lastName"]'
    zipPostalCodeField = 'input[data-test="postalCode"]'
    continueBtn = 'input[data-test="continue"]'
    inventoryItemPrices = 'div.inventory_item_price'
    subtotalPrice = 'div.summary_subtotal_label'
    headerConfirmationMsg = 'h2.complete-header'
    completeConfirmationMsg = 'div.complete-text'

    // Login Page:
    visitLoginPage() {
        cy.visit('https://www.saucedemo.com/');
    }
    submitLoginSucessful(username,password){
        cy.get(this.usernameField).type(username);
        cy.get(this.passwordField).type(password);
        cy.get(this.loginBtn).click();
    }
}

export const Sauce = new Saucedemo()