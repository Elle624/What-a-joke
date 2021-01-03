describe('Home page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('Should display correct title and button', () => {
    cy.get('h1')
      .should('contain', 'What A Joke')
      .get('h2')
      .contains('👉 Ready for laughing? 👈');
  });

  it("Should direct to different url upon clicking on 'ready'", () => {
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
    cy.get('h2').click().url().should('include', '/jokes');
  });
});
