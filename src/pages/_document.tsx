import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';

const serviceWorkerRegistration = `
  document.addEventListener('DOMContentLoaded', event => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js', { scope: "/" }).then(registration => {
          console.log('SW registered: ', registration)
        }).catch(registrationError => {
          console.log('SW registration failed: ', registrationError)
        })
      })
    }
  })
`;

export default class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const page = renderPage();

    const styles = [
      <style
        dangerouslySetInnerHTML={{
          __html: `
            #__next {
              display: flex;
              flex-direction: column;
            }

            :root {
              --navbar: #673AB7;
              --navbarTextColor: #fff;
              --navbarHeight: 56px;
              --toolbarHeight: 44px;
            }

            * {
              box-sizing: border-box !important;
            }
            
            html {
              font-size: 10px;
            }
            
            body {
              font-size: 1.6rem;
              margin: 0;
              font-family: system-ui, -apple-system, BlinkMacSystemFont, segoeUI, Roboto,
                Ubuntu, 'Helvetica Neue', sans-serif;
              -webkit-tap-highlight-color: transparent;
            }
          `,
        }}
      />,
    ];

    return { ...page, styles: React.Children.toArray(styles) };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <meta name="apple-mobile-web-app-title" content="Reddit" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta name="name" content="reason-graphql-demo" />
          <meta name="description" content="reddit pwa next.js" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#673AB7" />

          {process.env.isProd && (
            <>
              <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/static/apple-touch-icon.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/static/favicon-32x32.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/static/favicon-16x16.png"
              />
              <link rel="manifest" href="/static/manifest.json" />
            </>
          )}
        </Head>
        <body>
          <main>
            <Main />
          </main>
          <NextScript />
          {process.env.isProd && (
            <script
              type="text/javascript"
              dangerouslySetInnerHTML={{ __html: serviceWorkerRegistration }}
            />
          )}
        </body>
      </html>
    );
  }
}
