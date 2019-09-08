let ste = ReasonReact.string;

type post = {
  id: string,
  title: string,
};

type subreddit = {posts: array(post)};

module SubredditQuery = [%graphql
  {|
query GetSubreddit($name: String!) {
    subreddit(name: $name) @bsRecord {
      posts @bsRecord {
        id
        title
      }
    }
  }
|}
];

[@react.component]
let make = () => <Subreddit name="reactJs" />;

[@genType "Index"]
let index = make;

[@gentype]
let default = Hoc.Apollo.withApollo(make);
