## reason-graphql-demo

Originated from: https://github.com/peggyrayzis/redux-to-graphql

[View the application](https://reason-graphql-demo.now.sh/)

Ultra high performance progressive web application built with React + Reason (with hooks) and Next.js.

[![Lighthouse score: 100/100](https://lighthouse-badge.appspot.com/?score=100&category=Performance)](https://github.com/ebidel/lighthouse-badge)
[![Lighthouse score: 100/100](https://lighthouse-badge.appspot.com/?score=100&category=PWA)](https://github.com/ebidel/lighthouse-badge)
[![Lighthouse score: 100/100](https://lighthouse-badge.appspot.com/?score=100&category=Accessibility)](https://github.com/ebidel/lighthouse-badge)
[![Lighthouse score: 100/100](https://lighthouse-badge.appspot.com/?score=100&category=Best%20Practices)](https://github.com/ebidel/lighthouse-badge)
[![Lighthouse score: 100/100](https://lighthouse-badge.appspot.com/?score=100&category=SEO)](https://github.com/ebidel/lighthouse-badge)

[![This project is using Percy.io for visual regression testing.](https://percy.io/static/images/percy-badge.svg)](https://percy.io/Dblechoc/reason-graphql-demo)

## Features

- Progressive web app
  - offline
  - install prompts on supported platforms
- Server side rendering
- Next.js 9 (canary)
- Webpack 4.x
- Babel 7.x
- Now.sh 2.x
- Reason React (latest release with hooks)
- Yarn (monorepo with workspaces)

## Things to know

- A production build is deployed from a merge to master
- A staging build is deployed from a PR against master

## Setting the project up locally

First of all make sure you are using node `10.15.3` (any node 10.x would also do) and latest yarn, you can always have a look at the `engines` section of the `package.json`. Why node 8.10. We are using Now.sh to make the app available online and underneath it's using AWS lambda and you have to use Node 8.

```sh
$ yarn (install)
$ yarn dev
```

After doing this, you'll have a server with hot-reloading running at [http://localhost:3000](http://localhost:3000) and a graphql server running at [http://localhost:3000/api/graphql](http://localhost:3000/api/graphql).

## When changing the graphql server schema

```sh
$ yarn dev
$ yarn update-graphql-schema
```

## Setting up your editor for reasonml

Go install this plugin from the vscode market: [here](https://marketplace.visualstudio.com/items?itemName=jaredly.reason-vscode). The plugin is called `reason-vscode` from Jared Forsyth. For more editors go see this [guide](https://reasonml.github.io/docs/en/editor-plugins).

## Run tests and friends

We don't want to use snapshots, we use also use [react-testing-library](https://github.com/testing-library/react-testing-library) to avoid having to use enzyme and to enforce best test practices.

```sh
$ yarn format
$ yarn typecheck
$ yarn lint
$ yarn test
```

or

```sh
$ yarn ci
```

## Troubleshooting

If you have any issue while running this sample app, open an issue or often just running `yarn clean && yarn build:reason` will help resolve issues.

## End to End tests

The end to end tests use the provided samples input and output. Please check `e2e/basic.test.tsx` for more details.

If you want to see it running locally visually (not headless) go change `packages/e2e/jest-puppeteer.config.js` and set `headless: false`.

```sh
$ yarn e2e
```

## Storybook

This is where we list all our components (comes with hot reloading)

```sh
$ yarn storybook
```

After doing this, you'll have a showcase page running at [http://localhost:6006](http://localhost:6006)

## CI

We are using [Github Actions](https://help.github.com/en/articles/about-github-actions).

## Useful Now.sh commands

```sh

# force a deploy
$ yarn now

# check all running instances
$ yarn now ls

# check logs for a given instance
$ yarn now logs reason-graphql-demo.now.sh --all
```
