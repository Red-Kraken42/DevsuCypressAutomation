import { Sauce } from '../../pageObjects/Saucedemo'; // Adjust the path as needed
describe('template spec', () => {
  it('passes', () => {
    Sauce.visitLoginPage()
    Sauce.submitLoginSucessful('standard_user','secret_sauce')
    cy.url().should((url)=>{
      expect(url).to.contains('/inventory.html')

  })
  })
})