import { ApolloServer, gql } from 'apollo-server-micro';
import fetch from 'isomorphic-fetch';

export type PostData = {
  data: Post;
};

export type Post = {
  id: string;
  title: string;
  author: string;
  ups: number;
};

export type Subreddit = {
  children: PostData[];
};

export type SubredditData = {
  data: Subreddit;
};

const typeDefs = gql`
  type Query {
    subreddit(name: String!): Subreddit
  }

  type Subreddit {
    posts: [Post!]!
  }

  type Post {
    id: String!
    title: String!
    author: String!
    """
    The upvotes a post has received
    """
    ups: Int!
  }
`;

const resolvers = {
  Query: {
    subreddit: async (_: any, { name }) => {
      const response: SubredditData = await fetch(
        `https://www.reddit.com/r/${name}.json`,
      ).then(r => r.json());
      return response && response.data;
    },
  },
  Subreddit: {
    posts: (subreddit: Subreddit) =>
      subreddit ? subreddit.children.map(child => child.data) : [],
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default server.createHandler({ path: '/api/graphql' });
