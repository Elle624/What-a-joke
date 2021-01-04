describe('Jokes page', () => {
  beforeEach(() => {
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
  });

  it('Should display a joke and emoji buttons', () => {
    cy.contains('This is a test joke').get('button').should('have.length', 2);
  });

  it.only('Should display a random joke if click dislike button', () => {
    cy.intercept(
      {
        method: 'GET',
        url: 'http://api.icndb.com/jokes/random'
      },
      {
        statusCode: 202,
        body: {
          value: {
            id: 24,
            joke: 'A lemon is walking on the street'
          }
        }
      }
    );
    // cy.request('GET', 'http://api.icndb.com/jokes/random', {
    //   value: {
    //     id: 24,
    //     joke: 'A lemon is walking on the street'
    //   }
    // });
    cy.get('button').first().click();
    cy.contains('A lemon is walking on the street');
  });

  it('Should display favorite joke if click favorite button', () => {
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
