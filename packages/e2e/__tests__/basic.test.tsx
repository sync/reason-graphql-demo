import config from '../jest-puppeteer.config';
import * as graphRequest from '../utils/graphRequest';

const timeout = 300000;

const url = `http://localhost:${config.server.port}`;

const openPage = (pageUrl = '/') => global.page.goto(`${url}${pageUrl}`);

describe('Basic integration', () => {
  let data;

  beforeEach(async () => {
    data = await graphRequest.makeGraphRequest(
      graphRequest.queries.subredditQuery,
      {
        name: 'reactjs',
      },
    );

    await openPage();
  }, timeout);

  it(
    'displays react news',
    async () => {
      await expect(global.page).toMatch(data.subreddit.posts[0].title);
    },
    timeout,
  );
});
