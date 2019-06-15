import React from 'react';
import { GlobalWithFetchMock } from 'jest-fetch-mock';
import mockConsole from 'jest-mock-console';
import { render, waitForElement } from '../../utils/testUtils';
import Index from '../../../pages/index.gen';
import {
  mockFetchSubredditOnce,
  mockFetchErrorResponseOnce,
} from '../../utils/fetchMocks';

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;

describe('Space', () => {
  beforeEach(() => {
    // eslint-disable-next-line global-require
    customGlobal.fetch = require('jest-fetch-mock');
    customGlobal.fetchMock = customGlobal.fetch;

    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    customGlobal.fetch.resetMocks();
  });

  it('renders stories given some posts', async () => {
    const subreddit = mockFetchSubredditOnce()!;

    const { getByText } = render(<Index />);

    // first post
    await waitForElement(() => getByText(subreddit.posts[0].title));

    // last post
    expect(
      getByText(subreddit.posts[subreddit.posts.length - 1].title),
    ).toBeTruthy();
  });

  it('renders no stories given no posts', async () => {
    mockFetchSubredditOnce({ subreddit: null });

    const { getByText } = render(<Index />);

    await waitForElement(() => getByText('No stories found'));
  });

  it('renders the provided error', async () => {
    const restoreConsole = mockConsole();

    const message = mockFetchErrorResponseOnce();

    const { getByText } = render(<Index />);

    await waitForElement(() => getByText('something is wrong'));

    // eslint-disable-next-line no-console
    expect(console.log).toHaveBeenCalledWith(
      `[Network error]: Error: ${message}`,
    );
    restoreConsole();
  });
});
