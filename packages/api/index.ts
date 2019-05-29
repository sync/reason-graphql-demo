import { ApolloServer, gql } from 'apollo-server';
import Reddit, { Subreddit } from './reddit';

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
    subreddit: (
      _: any,
      { name },
      { dataSources }: { dataSources: { Reddit: Reddit } },
    ) => dataSources.Reddit.subreddit({ name }),
  },
  Subreddit: {
    posts: (subreddit: Subreddit) =>
      subreddit ? subreddit.children.map(child => child.data) : [],
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    Reddit: new Reddit(),
  }),
  introspection: true,
  playground: true,
});

server.listen().then(({ url }) => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at ${url}`);
});
