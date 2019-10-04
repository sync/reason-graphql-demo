const ora = require('ora');
const Promise = require('bluebird');
const { GraphQLClient } = require('graphql-request');

const queries = {
  subredditQuery: `
    query GetSubreddit($name: String!) {
      subreddit(name: $name) {
        posts {
          id
          title
        }
      }
    }
  `,
};

const makeGraphRequest = (apiUrl, operation, variables, user) => {
  const opts = {};

  if (user && user.JWT) {
    opts.headers = {
      Authorization: `Bearer ${user.JWT}`,
    };
  }

  const client = new GraphQLClient(apiUrl, opts);
  return client.request(operation, variables);
};

const apiUrl = 'http://localhost:3000/api/graphql';

const getSubredditAsync = name => {
  return new Promise((resolve, reject) => {
    return makeGraphRequest(apiUrl, queries.subredditQuery, {
      name,
    })
      .then(({ subreddit }) => {
        if (subreddit) {
          resolve(subreddit);
        } else {
          reject(new Error('Could not load subreddit'));
        }
      })
      .catch(error => {
        reject(error);
      });
  });
};

module.exports = (on, config) => {
  on('task', {
    getSubreddit(name) {
      const spinner = ora('Looking for subreddit').start();
      return getSubredditAsync(name)
        .tap(() => {
          spinner.succeed('Found subreddit');
        })
        .tapCatch(err => {
          spinner.fail(err.message);
        });
    },
  });
};
