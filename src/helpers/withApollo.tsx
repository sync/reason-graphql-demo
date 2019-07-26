import Head from 'next/head';
import { AppContext } from 'next/app';
import React from 'react';
import { getDataFromTree } from '@apollo/react-hooks';
import initApollo from './initApollo';

export interface Props {
  apolloClient: any;
  apolloState: {
    data: object | null;
  };
  baseUrl: string;
}

export default (App: any) =>
  class Apollo extends React.Component<Props> {
    static displayName = 'withApollo(App)';

    static async getInitialProps(props: AppContext) {
      const {
        Component,
        router,
        ctx: { req },
      } = props;

      function getBaseUrl(req) {
        const protocol = req.headers['x-forwarded-proto'] || 'http';
        const host = req.headers['x-forwarded-host'] || req.headers.host;
        return `${protocol}://${host}`;
      }

      const baseUrl = req ? getBaseUrl(req) : '';

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(props);
      }

      const apolloState: { data?: any } = {};

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const apollo = initApollo(baseUrl, {});
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
        baseUrl,
        apolloState,
      };
    }

    apolloClient: any;

    constructor(props: Props) {
      super(props);

      // `getDataFromTree` renders the component first, the client is passed off as a property.
      // After that rendering is done using Next's normal rendering pipeline
      this.apolloClient =
        props.apolloClient || initApollo(props.baseUrl, props.apolloState.data);
    }

    render() {
      return <App {...this.props} apolloClient={this.apolloClient} />;
    }
  };
