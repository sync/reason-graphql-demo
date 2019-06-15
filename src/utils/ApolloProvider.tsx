import React from 'react';
import { ApolloProvider as ActualApolloProvider } from '@apollo/react-hooks';
import ApolloClient from 'apollo-client';
import initApollo from '../helpers/initApollo';

type Props = {
  apolloClient?: ApolloClient<{}>;
};

const ApolloProvider: React.FC<Props> = ({
  apolloClient = initApollo('localhost:666', {}),
  children,
}) => {
  return (
    <ActualApolloProvider client={apolloClient}>
      {children}
    </ActualApolloProvider>
  );
};

export default ApolloProvider;
