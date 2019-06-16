let ste = ReasonReact.string;

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
let make = () => {
  let (selectedSubreddit, setSelectedSubreddit) =
    React.useState(() => "reactjs");

  let query = SubredditQuery.make(~name=selectedSubreddit, ());
  let result = ApolloHooks.useQuery(~query);

  switch (result) {
  | ApolloHooks.Loading => <div> {ste("Loading")} </div>
  | ApolloHooks.Error(message) => <div> {ste(message)} </div>
  | ApolloHooks.Data(response) =>
    switch (response##subreddit) {
    | Some(subreddit) =>
      <div>
        <Picker
          value=selectedSubreddit
          onChange=setSelectedSubreddit
          options=[|"reactjs", "frontend"|]
        />
        <ul>
          {subreddit##posts
           |> Array.map(post =>
                <li key={post##id}> {post##title |> ste} </li>
              )
           |> ReasonReact.array}
        </ul>
      </div>
    | _ => <div> {"No stories found" |> ste} </div>
    }
  };
};

[@gentype]
let default = make;
