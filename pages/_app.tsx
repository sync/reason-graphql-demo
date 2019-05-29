import App, { Container } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { ClientContext, GraphQLClient } from 'graphql-hooks';
import Header from '../src/components/Header';
import withGraphQLClient from '../src/helpers/withGraphQLClient';

type Props = {
  graphQLClient: GraphQLClient;
};

class MyApp extends App<Props> {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, graphQLClient } = this.props;

    return (
      <Container>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
          />
          <title>Reddit</title>
        </Head>

        <ClientContext.Provider value={graphQLClient}>
          <Header />
          <Component {...pageProps} />
        </ClientContext.Provider>
      </Container>
    );
  }
}

export default withGraphQLClient(MyApp);
