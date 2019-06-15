// Generated by BUCKLESCRIPT VERSION 5.0.4, PLEASE EDIT WITH CARE

import * as $$Array from "bs-platform/lib/es6/array.js";
import * as React from "react";
import * as Js_exn from "bs-platform/lib/es6/js_exn.js";
import * as Js_dict from "bs-platform/lib/es6/js_dict.js";
import * as Js_json from "bs-platform/lib/es6/js_json.js";
import * as ApolloHooks from "../src/bindings/ApolloHooks.bs.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";

function ste(prim) {
  return prim;
}

var ppx_printed_query = "query GetSubreddit($name: String!)  {\nsubreddit(name: $name)  {\nposts  {\nid  \ntitle  \n}\n\n}\n\n}\n";

function parse(value) {
  var match = Js_json.decodeObject(value);
  if (match !== undefined) {
    var match$1 = Js_dict.get(Caml_option.valFromOption(match), "subreddit");
    var tmp;
    if (match$1 !== undefined) {
      var value$1 = Caml_option.valFromOption(match$1);
      var match$2 = Js_json.decodeNull(value$1);
      if (match$2 !== undefined) {
        tmp = undefined;
      } else {
        var match$3 = Js_json.decodeObject(value$1);
        var tmp$1;
        if (match$3 !== undefined) {
          var match$4 = Js_dict.get(Caml_option.valFromOption(match$3), "posts");
          var tmp$2;
          if (match$4 !== undefined) {
            var value$2 = Caml_option.valFromOption(match$4);
            var match$5 = Js_json.decodeArray(value$2);
            tmp$2 = match$5 !== undefined ? match$5.map((function (value) {
                      var match = Js_json.decodeObject(value);
                      if (match !== undefined) {
                        var value$1 = Caml_option.valFromOption(match);
                        var match$1 = Js_dict.get(value$1, "id");
                        var tmp;
                        if (match$1 !== undefined) {
                          var value$2 = Caml_option.valFromOption(match$1);
                          var match$2 = Js_json.decodeString(value$2);
                          tmp = match$2 !== undefined ? match$2 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$2));
                        } else {
                          tmp = Js_exn.raiseError("graphql_ppx: Field id on type Post is missing");
                        }
                        var match$3 = Js_dict.get(value$1, "title");
                        var tmp$1;
                        if (match$3 !== undefined) {
                          var value$3 = Caml_option.valFromOption(match$3);
                          var match$4 = Js_json.decodeString(value$3);
                          tmp$1 = match$4 !== undefined ? match$4 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$3));
                        } else {
                          tmp$1 = Js_exn.raiseError("graphql_ppx: Field title on type Post is missing");
                        }
                        return {
                                id: tmp,
                                title: tmp$1
                              };
                      } else {
                        return Js_exn.raiseError("graphql_ppx: Object is not a value");
                      }
                    })) : Js_exn.raiseError("graphql_ppx: Expected array, got " + JSON.stringify(value$2));
          } else {
            tmp$2 = Js_exn.raiseError("graphql_ppx: Field posts on type Subreddit is missing");
          }
          tmp$1 = {
            posts: tmp$2
          };
        } else {
          tmp$1 = Js_exn.raiseError("graphql_ppx: Object is not a value");
        }
        tmp = Caml_option.some(tmp$1);
      }
    } else {
      tmp = undefined;
    }
    return {
            subreddit: tmp
          };
  } else {
    return Js_exn.raiseError("graphql_ppx: Object is not a value");
  }
}

function make(name, param) {
  return {
          query: ppx_printed_query,
          variables: Js_dict.fromArray(/* array */[/* tuple */[
                  "name",
                  name
                ]]),
          parse: parse
        };
}

function makeWithVariables(variables) {
  var name = variables.name;
  return {
          query: ppx_printed_query,
          variables: Js_dict.fromArray(/* array */[/* tuple */[
                  "name",
                  name
                ]]),
          parse: parse
        };
}

function ret_type(f) {
  return /* module */[];
}

var MT_Ret = /* module */[];

var SubredditQuery = /* module */[
  /* ppx_printed_query */ppx_printed_query,
  /* query */ppx_printed_query,
  /* parse */parse,
  /* make */make,
  /* makeWithVariables */makeWithVariables,
  /* ret_type */ret_type,
  /* MT_Ret */MT_Ret
];

function Index(Props) {
  var query = make("reactjs", /* () */0);
  var result = ApolloHooks.useQuery(query);
  if (typeof result === "number") {
    return React.createElement("div", undefined, "Loading");
  } else if (result.tag) {
    var match = result[0].subreddit;
    if (match !== undefined) {
      return React.createElement("ul", undefined, $$Array.map((function (post) {
                        return React.createElement("li", {
                                    key: post.id
                                  }, post.title);
                      }), Caml_option.valFromOption(match).posts));
    } else {
      return React.createElement("div", undefined, "No stories found");
    }
  } else {
    return React.createElement("div", undefined, result[0]);
  }
}

var make$1 = Index;

var $$default = Index;

export {
  ste ,
  SubredditQuery ,
  make$1 as make,
  $$default ,
  $$default as default,
  
}
/* react Not a pure module */
