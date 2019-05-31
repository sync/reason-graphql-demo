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
  let query = SubredditQuery.make(~name="reactjs", ());
  let result = GraphqlHooks.useQuery(~query);

  switch (result) {
  | GraphqlHooks.Loading => <div> {ste("Loading")} </div>
  | GraphqlHooks.Error(message) => <div> {ste(message)} </div>
  | GraphqlHooks.Data(response) =>
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

let default = make;
