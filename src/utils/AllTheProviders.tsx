import React from 'react';
import RouterProvider from '../utils/RouterProvider';
import ApolloProvider from './ApolloProvider';

const AllTheProviders = ({ children }) => {
  return (
    <RouterProvider router={{ pathname: '/' }}>
      <ApolloProvider>{children}</ApolloProvider>
    </RouterProvider>
  );
};

export default AllTheProviders;
