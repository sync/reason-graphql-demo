import React from 'react';
import { ApolloProvider as ActualApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import { createApolloClient } from '../helpers/initApollo';

type Props = {
  apolloClient?: ApolloClient<{}>;
};

const ApolloProvider: React.FC<Props> = ({
  apolloClient = createApolloClient('localhost:666', {}),
  children,
}) => {
  return (
    <ActualApolloProvider client={apolloClient}>
      {children}
    </ActualApolloProvider>
  );
};

export default ApolloProvider;
