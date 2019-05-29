import { GraphQLClient } from 'graphql-hooks';
import memCache from 'graphql-hooks-memcache';
import fetch from 'isomorphic-fetch';

let graphQLClient: GraphQLClient | null = null;

function create(host: string, initialState = {}) {
  const url =
    process.env.NODE_ENV === 'production'
      ? `https://${host}`
      : 'http://localhost:3000';

  return new GraphQLClient({
    ssrMode: !process.browser,
    url: `${url}/graphql`,
    cache: memCache({ initialState }),
    // @ts-ignore
    fetch: process.browser ? fetch.bind() : fetch,
  });
}

export default function initGraphQL(host: string, initialState?: object) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(host, initialState);
  }

  // Reuse client on the client-side
  if (!graphQLClient) {
    graphQLClient = create(host, initialState);
  }

  return graphQLClient;
}
