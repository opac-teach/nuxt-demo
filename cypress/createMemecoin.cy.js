describe('Memecoin Creation', () => {
    it('creates a memecoin and displays it in the list', () => {
      // Visit the page
      cy.visit('/exercices');
      
      // Login first
      cy.get('#password').type('admin123');
      cy.contains('button', 'Login').click();
      
      // Create a memecoin with a unique name (using timestamp to avoid conflicts)
      const timestamp = new Date().getTime();
      const coinName = `TestCoin${timestamp}`;
      
      // Fill out the form
      cy.get('#name').type(coinName);
      cy.get('#symbol').type('TEST');
      cy.get('#description').type('This is an automated test coin');
      cy.get('#logoUrl').type('https://example.com/logo.png');
      
      // Submit the form
      cy.contains('button', 'Create Coin').click();
      
      // Check that the new memecoin appears in the list
      cy.contains(`${coinName} : TEST`).should('be.visible');
      
      // Verify the image is displayed
      cy.get(`img[alt="Coin logo"]`).should('have.attr', 'src', 'https://example.com/logo.png');
    });
  });