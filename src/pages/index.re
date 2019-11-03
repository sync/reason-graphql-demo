let ste = ReasonReact.string;

[@react.component]
let make = () => <Subreddit name="reactJs" />;

[@genType "Index"]
let index = make;

[@gentype]
let default = Hoc.Apollo.withApollo(make);
