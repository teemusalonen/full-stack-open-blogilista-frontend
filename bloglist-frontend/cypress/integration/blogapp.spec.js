/* eslint-disable no-undef */

describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    const userMoi = {
      name: 'moi',
      username: 'moi',
      password: 'moi'
    }
    const userKoira = {
      name: 'koira',
      username: 'koira',
      password: 'koira'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', userMoi)
    cy.request('POST', 'http://localhost:3003/api/users/', userKoira)
    cy.visit("http://localhost:3000")
  })

  it("Login form is shown", function () {
    cy.contains("Log in to the application")
    cy.contains("login")
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('moi')
      cy.get('#password').type('moi')
      cy.get('#login-button').click()
      cy.contains('user moi logged in')

      cy.contains('Logout').click()
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type(':D')
      cy.get('#password').type(':D')
      cy.get('#login-button').click()

      cy.contains("Log in to the application")
      cy.contains("login")
      
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('moi')
      cy.get('#password').type('moi')
      cy.get('#login-button').click()
      cy.contains('user moi logged in')
    })

    it('A blog can be created', function() {
      cy.contains('Create a new blog').click()
      cy.get('#title').type('title=)')
      cy.get('#author').type('author=)')
      cy.get('#url').type('url=)')
      cy.contains('create').click()
      cy.contains('view').click()
      cy.contains('title=)')
      cy.contains('author=)')
      cy.contains('url=)')

    })

    it('A blog can liked', function() {
      //Create new blog
      cy.contains('Create a new blog').click()
      cy.get('#title').type('title=)')
      cy.get('#author').type('author=)')
      cy.get('#url').type('url=)')
      cy.contains('create').click()
      cy.contains('view').click()
      cy.contains('title=)')
      cy.contains('author=)')
      cy.contains('url=)')
      
      // Test if likes go up
      cy.contains('likes: 0')
      cy.get('#like-button').click()
      cy.contains('likes: 1')

    })

    it('A blog can removed', function() {
      //Create new blog
      cy.contains('Create a new blog').click()
      cy.get('#title').type('title=)')
      cy.get('#author').type('author=)')
      cy.get('#url').type('url=)')
      cy.contains('create').click()
      cy.contains('view').click()

      // Test if blog is removed
      cy.contains('remove')
      cy.get('#remove-button').click()
      cy.get('#remove-button').should('not.exist')
      cy.get('#like-button').should('not.exist')
      cy.contains('title=)').should('not.exist')

    })
    
  })

})
