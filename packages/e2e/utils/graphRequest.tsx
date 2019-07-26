import { GraphQLClient } from 'graphql-request';

export async function makeGraphRequest(operation, variables) {
  const opts = {};

  const client = new GraphQLClient('http://localhost:3000/api/graphql', opts);
  return client.request(operation, variables);
}

export const queries = {
  subredditQuery: `
    query GetSubreddit($name: String!) {
      subreddit(name: $name) {
        posts {
          id
          title
        }
      }
    }
  `,
};
