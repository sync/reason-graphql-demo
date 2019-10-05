context('Index Integrations', () => {
  let subreddit;

  before(() => {
    cy.task('getSubreddit', 'reactjs').then(providedSubreddit => {
      subreddit = providedSubreddit;
    });
  });

  beforeEach(() => {
    cy.openPage();
  });

  it('can display react news', () => {
    cy.contains(subreddit.posts[0].title);
  });
});
