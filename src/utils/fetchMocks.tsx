import { GlobalWithFetchMock } from 'jest-fetch-mock';
import subredditFixture from './fixtures/subredditFixture';

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;

type Subreddit = typeof subredditFixture;

export function mockFetchSubredditOnce({
  delay = 0,
  subreddit = subredditFixture,
}: { delay?: number; subreddit?: Subreddit | null } = {}) {
  customGlobal.fetch.mockResponseOnce(
    () =>
      new Promise(resolve =>
        setTimeout(
          () =>
            resolve({
              body: JSON.stringify({
                data: {
                  subreddit,
                },
              }),
            }),
          delay,
        ),
      ),
  );

  return subreddit;
}

export function mockFetchErrorResponseOnce(message = 'fake error message') {
  customGlobal.fetch.mockRejectOnce(new Error(message));

  return message;
}
