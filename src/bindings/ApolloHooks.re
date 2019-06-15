type queryString;

type gql = (. string) => queryString;

[@bs.module "graphql-tag"] external gql: gql = "default";

[@bs.deriving abstract]
type clientRequestResult('error, 'data) = {
  loading: bool,
  error: 'error,
  data: 'data,
};

type queryResponse('a) =
  | Loading
  | Error(string)
  | Data('a);

[@bs.module "@apollo/react-hooks"]
external _useQuery:
  (queryString, Js.Dict.t('a)) => clientRequestResult('error, 'data) =
  "useQuery";

let useQuery = (~query) => {
  let graphqlQueryAST = gql(. query##query);
  let options = Js.Dict.fromList([("variables", query##variables)]);
  let result = _useQuery(graphqlQueryAST, options);

  switch (result->loadingGet, result->errorGet, result->dataGet) {
  | (true, _, _) => Loading
  | (false, false, Some(response)) => Data(response |> query##parse)
  | _ => Error("something is wrong")
  };
};
