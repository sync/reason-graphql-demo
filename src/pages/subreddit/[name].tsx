import React from 'react';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import Subreddit from '../../components/Subreddit.gen';
import withApollo from '../../helpers/withApollo';

const SubredditForName: NextPage = () => {
  const router = useRouter();
  return <Subreddit name={(router.query.name as string) || 'reactjs'} />;
};

export default withApollo(SubredditForName);
