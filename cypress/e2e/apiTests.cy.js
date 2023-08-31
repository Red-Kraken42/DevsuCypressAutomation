const currentDate = new Date();

// Extract the year, month, day, hour, minutes, and seconds
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const day = currentDate.getDate();
const hour = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();

// Create a numeric value using the format: YYYYMMDDHHMMSS
const numericValue = parseInt(
  `${year}${month.toString().padStart(2, '0')}${day.toString().padStart(2, '0')}${hour.toString().padStart(2, '0')}${minutes.toString().padStart(2, '0')}${seconds.toString().padStart(2, '0')}`
);

const dynamicID = numericValue
const dynamicUserName = "Ricardo" + numericValue
const updatedUserName = "updated" + numericValue
const updatedEmail = "updatedemail@email.com"
const user = [
  {
    id: dynamicID,
    username: dynamicUserName,
    firstName: "ricardo",
    lastName: "osegueda",
    email: "ricardo@email.com",
    password: "password1",
    phone: "77777777",
    userStatus: 0
  }
]

describe('API Tests', () => {
  it('Create a user', () => {
    cy.log(numericValue)
    cy.request('POST', `https://petstore.swagger.io/v2/user/createWithArray`, user)
      .then((response) => {
        const jsonString = JSON.stringify(response.body);
        cy.log(`Response: ${jsonString}`)
        cy.log(response.body)
      })
    cy.request('GET', `https://petstore.swagger.io/v2/user/${dynamicUserName}`).then((response) => {
      expect(response.body.username).to.be.equal(dynamicUserName)
    })
  })
  it('Search created user', () => {
    cy.request('GET', `https://petstore.swagger.io/v2/user/${dynamicUserName}`).then((response) => {
      const jsonString = JSON.stringify(response.body);
      cy.log(`Response: ${jsonString}`)
      cy.log(response.status)
      expect(response.body.username).to.be.equal(dynamicUserName)
    })
  })
  it('Update user name and email', () => {
    cy.request('PUT', `https://petstore.swagger.io/v2/user/${dynamicUserName}`,
      {
        id: dynamicID,
        username: updatedUserName,
        firstName: "ricardo",
        lastName: "osegueda",
        email: updatedEmail,
        password: "password1",
        phone: "77777777",
        userStatus: 0
      })
    cy.request('GET', `https://petstore.swagger.io/v2/user/${updatedUserName}`).then((response) => {
      expect(response.body.username).to.be.equal(updatedUserName)
      expect(response.body.email).to.be.equal(updatedEmail)
    })
  });
  it('Delete user', () => {
    cy.request('DELETE', `https://petstore.swagger.io/v2/user/${updatedUserName}`)
    cy.request({method:'GET',url:`https://petstore.swagger.io/v2/user/${updatedUserName}`,failOnStatusCode:false})
      .then((response) => {
        expect(response.status).to.be.equal(404)
        expect(response.body.message).to.be.equal('User not found')
      })
  });
})