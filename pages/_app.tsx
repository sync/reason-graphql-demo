import ApolloClient from 'apollo-client';
import App, { Container, AppContext } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import withApolloClient from '../src/helpers/withApollo';
import Header from '../src/components/Header.gen';

interface Props extends App {
  apolloClient: ApolloClient<{}>;
}

class MyApp extends App<Props> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, apolloClient } = this.props;

    return (
      <Container>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no, viewport-fit=cover"
          />
          <title>Reddit</title>
        </Head>

        <ApolloProvider client={apolloClient}>
          <Header />
          <Component {...pageProps} />
        </ApolloProvider>
      </Container>
    );
  }
}

export default withApolloClient(MyApp);
