let ste = ReasonReact.string;

type post = {
  id: string,
  title: string,
};

type subreddit = {posts: array(post)};

module SubredditQuery = [%graphql
  {|
query GetSubreddit($name: String!) {
    subreddit(name: $name) {
      posts {
        id
        title
      }
    }
  }
|}
];

[@react.component]
let make = (~name) => {
  let query = SubredditQuery.make(~name, ());
  let result = ApolloHooks.useQuery(~query);

  switch (result) {
  | ApolloHooks.Loading => <div> {ste("Loading")} </div>
  | ApolloHooks.Error(message) => <div> {ste(message)} </div>
  | ApolloHooks.Data(response) =>
    switch (response##subreddit) {
    | Some(subreddit) =>
      <ul>
        {subreddit##posts
         |> Array.map(post => <li key={post##id}> {post##title |> ste} </li>)
         |> ReasonReact.array}
      </ul>
    | _ => <div> {"No stories found" |> ste} </div>
    }
  };
};

[@genType "Subreddit"]
let default = make;
