import * as React from 'react';
import { NextPage } from 'next';
import { useQuery } from 'graphql-hooks';

export type Post = {
  id: string;
  title: string;
  author: string;
  ups: number;
};

const SUBREDDIT_QUERY = `query GetSubreddit($name: String!) {
  subreddit(name: $name) {
    posts {
      id
      title
    }
  }
}`;

const IndexPage: NextPage = () => {
  const { loading, error, data } = useQuery(SUBREDDIT_QUERY, {
    variables: {
      name: 'reactjs',
    },
  });

  if (loading) return <div>Loading</div>;
  if (error) return <div>something is wrong</div>;

  const posts: Post[] = data && data.subreddit && data.subreddit.posts;
  if (posts) {
    return (
      <ul>
        {posts.map(post => (
          <li key={post.id}> {post.title} </li>
        ))}
      </ul>
    );
  }

  return <div>No stories found</div>;
};

export default IndexPage;
