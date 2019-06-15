import { Hermes } from 'apollo-cache-hermes';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { createHttpLink } from 'apollo-link-http';
import fetch from 'isomorphic-fetch';

let apolloClient: ApolloClient<{}> | null = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  // @ts-ignore
  global.fetch = fetch;
}

function create(host: string, initialState: object | null) {
  const url =
    process.env.NODE_ENV === 'production'
      ? `https://${host}`
      : 'http://localhost:3000';

  const httpLink = createHttpLink({
    uri: `${url}/graphql`,
    credentials: 'same-origin',
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        // eslint-disable-next-line no-console
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      );
    }

    if (networkError) {
      // eslint-disable-next-line no-console
      console.log(`[Network error]: ${networkError}`);
    }
  });

  const transports = [errorLink, httpLink];
  const allLink: any = ApolloLink.from(transports);

  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: allLink,
    cache: new Hermes({
      resolverRedirects: {
        Query: {
          node: ({ id }) => id,
        },
      },
      addTypename: true,
      freeze: true,
    }).restore(initialState || {}),
  });
}

export default function initApollo(host: string, initialState: object | null) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(host, initialState);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(host, initialState);
  }

  return apolloClient;
}
