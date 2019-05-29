import React from 'react';
import Head from 'next/head';
import { GraphQLClient } from 'graphql-hooks';
import { getInitialState } from 'graphql-hooks-ssr';
import initGraphQL from './initGraphQL';

export default (App: any) => {
  return class GraphQLHooks extends React.Component {
    static displayName = 'GraphQLHooks(App)';
    static async getInitialProps(props) {
      const { Component, router, ctx } = props;

      const host = process.browser
        ? window.location.host
        : ctx.req.headers.host;

      let appProps = {};
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(props);
      }

      // Run all GraphQL queries in the component tree
      // and extract the resulting data
      const graphQLClient = initGraphQL(host);
      let graphQLState = {};
      if (!process.browser) {
        try {
          // Run all GraphQL queries
          graphQLState = await getInitialState({
            // @ts-ignore
            App: (
              <App
                {...appProps}
                Component={Component}
                router={router}
                graphQLClient={graphQLClient}
              />
            ),
            client: graphQLClient,
          });
        } catch (error) {
          // Prevent GraphQL hooks client errors from crashing SSR.
          // Handle them in components via the state.error prop:
          // https://github.com/nearform/graphql-hooks#usequery
          // eslint-disable-next-line no-console
          console.error('Error while running `getInitialState`', error);
        }

        // getInitialState does not call componentWillUnmount
        // head side effect therefore need to be cleared manually
        Head.rewind();
      }

      return {
        ...appProps,
        host,
        graphQLState,
      };
    }

    graphQLClient: GraphQLClient;

    constructor(props) {
      super(props);
      this.graphQLClient = initGraphQL(props.host, props.graphQLState);
    }

    render() {
      return <App {...this.props} graphQLClient={this.graphQLClient} />;
    }
  };
};
