import Head from 'next/head';
import React from 'react';
import { getDataFromTree } from '@apollo/react-hooks';
import initApollo from './initApollo';

export interface Props {
  apolloClient: any;
  apolloState: {
    data: object | null;
  };
  host: string;
}

export default (App: any) =>
  class Apollo extends React.Component<Props> {
    static displayName = 'withApollo(App)';

    static async getInitialProps(props) {
      const { Component, router, ctx } = props;

      const host = process.browser
        ? window.location.host
        : ctx.req.headers.host;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(props);
      }

      const apolloState: { data?: any } = {};

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo(host, {});
      try {
        // Run all GraphQL queries
        await getDataFromTree(
          <App
            {...appProps}
            Component={Component}
            router={router}
            apolloState={apolloState}
            apolloClient={apollo}
          />,
        );
      } catch (error) {
        // Prevent Apollo Client GraphQL errors from crashing SSR.
        // Handle them in components via the data.error prop:
        // http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
        // eslint-disable-next-line no-console
        console.error('Error while running `getInitialState`', error);
      }

      if (!process.browser) {
        // getDataFromTree does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      // Extract query data from the Apollo store
      if (apollo) {
        apolloState.data = apollo.cache.extract();
      }

      return {
        ...appProps,
        host,
        apolloState,
      };
    }

    apolloClient: any;

    constructor(props: Props) {
      super(props);

      // `getDataFromTree` renders the component first, the client is passed off as a property.
      // After that rendering is done using Next's normal rendering pipeline
      this.apolloClient =
        props.apolloClient || initApollo(props.host, props.apolloState.data);
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
