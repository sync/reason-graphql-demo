module MemCache = {
  type t;

  [@bs.deriving abstract]
  type config = {initialState: Js.Json.t};

  type conf = Js.Json.t;

  [@bs.module "graphql-hooks-memcache"]
  external _createMemCache: config => t = "default";
};

let createMemCache = (~initialState) => {
  let config = MemCache.config(~initialState);
  MemCache._createMemCache(config);
};

module Client = {
  type t;

  [@bs.deriving abstract]
  type config = {
    url: string,
    cache: MemCache.t,
  };

  [@bs.module "graphql-hooks"] [@bs.new]
  external _createClient: config => t = "GraphQLClient";
};

let createClient = (~url: string, ~cache: MemCache.t) => {
  let config = Client.config(~url, ~cache);
  Client._createClient(config);
};

[@bs.val] [@bs.module "graphql-hooks"]
external context: React.Context.t(Client.t) = "ClientContext";

module Provider = {
  let provider = React.Context.provider(context);

  [@react.component] [@bs.module "graphql-hooks"] [@bs.scope "ClientContext"]
  external make: (~value: Client.t, ~children: React.element) => React.element =
    "Provider";
};

[@bs.deriving abstract]
type clientRequestResult('any) = {
  loading: bool,
  cacheHit: bool,
  error: bool,
  data: 'any,
};

type queryResponse('a) =
  | Loading
  | Error(string)
  | Data('a);

[@bs.module "graphql-hooks"]
external _useQuery: (string, Js.Dict.t('a)) => clientRequestResult('any) =
  "useQuery";

let useQuery = (~query) => {
  let options = Js.Dict.fromList([("variables", query##variables)]);
  let result = _useQuery(query##query, options);
  switch (result->loadingGet, result->errorGet, result->dataGet) {
  | (true, _, _) => Loading
  | (false, false, Some(response)) => Data(response |> query##parse)
  | _ => Error("something is wrong")
  };
};
