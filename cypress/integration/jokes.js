describe('Jokes page', () => {
  
  it('Should display a joke and emoji buttons', () => {
    cy.visit('http://localhost:3000');
    cy.intercept(
      {
        method: 'GET',
        url: 'http://api.icndb.com/jokes/random'
      },
      {
        statusCode: 201,
        body: {
          value: {
            id: 2,
            joke: 'This is a test joke'
          }
        }
      }
    );
    cy.get('h2').click();

    cy.contains('This is a test joke').get('button').should('have.length', 2);
  });

  it('Should display a random joke if click dislike button', () => {
    cy.visit('http://localhost:3000/jokes', {
      onBeforeLoad(win) {
        cy.stub(win, 'fetch')
          .withArgs('http://api.icndb.com/jokes/random')
          .resolves(
            Cypress.Promise.resolve({
              ok: true,
              json: () => ({
                value: {
                  id: 2,
                  joke: 'This is a test joke'
                }
              })
            }).delay(2000)
          );
      }
    });

    cy.get('button').first().click();
    cy.contains('This is a test joke');

    cy.visit('http://localhost:3000/jokes', {
      onBeforeLoad(win) {
        cy.stub(win, 'fetch')
          .withArgs('http://api.icndb.com/jokes/random')
          .resolves(
            Cypress.Promise.resolve({
              ok: true,
              json: () => ({
                value: {
                  id: 24,
                  joke: 'A lemon is walking on the street'
                }
              })
            }).delay(2000)
          );
      }
    });
    cy.contains('A lemon is walking on the street');
  });

  it('Should display favorite joke if click favorite button', () => {
    cy.visit('http://localhost:3000');
    cy.intercept(
      {
        method: 'GET',
        url: 'http://api.icndb.com/jokes/random'
      },
      {
        statusCode: 201,
        body: {
          value: {
            id: 2,
            joke: 'This is a test joke'
          }
        }
      }
    );
    cy.get('h2').click();

    cy.intercept(
      {
        method: 'GET',
        url: 'http://api.icndb.com/jokes/2'
      },
      {
        statusCode: 201,
        body: {
          value: {
            id: 2,
            joke: 'This is a test joke'
          }
        }
      }
    );

    cy.get('button').first().next().click();
    cy.get('p').should('have.length', 2);
  });
});
