// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as $$Array from "bs-platform/lib/es6/array.js";
import * as React from "react";
import * as Js_exn from "bs-platform/lib/es6/js_exn.js";
import * as Js_dict from "bs-platform/lib/es6/js_dict.js";
import * as Js_json from "bs-platform/lib/es6/js_json.js";
import * as Caml_obj from "bs-platform/lib/es6/caml_obj.js";
import * as Js_option from "bs-platform/lib/es6/js_option.js";
import * as ApolloHooks from "@dblechoc/bs-apollo/src/ApolloHooks.bs.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";

function ste(prim) {
  return prim;
}

var ppx_printed_query = "query GetSubreddit($name: String!)  {\nsubreddit(name: $name)  {\nposts  {\nid  \ntitle  \n}\n\n}\n\n}\n";

function parse(value) {
  var value$1 = Js_option.getExn(Js_json.decodeObject(value));
  var match = Js_dict.get(value$1, "subreddit");
  var tmp;
  if (match !== undefined) {
    var value$2 = Caml_option.valFromOption(match);
    var match$1 = Js_json.decodeNull(value$2);
    if (match$1 !== undefined) {
      tmp = undefined;
    } else {
      var value$3 = Js_option.getExn(Js_json.decodeObject(value$2));
      var match$2 = Js_dict.get(value$3, "posts");
      tmp = {
        posts: match$2 !== undefined ? Js_option.getExn(Js_json.decodeArray(Caml_option.valFromOption(match$2))).map((function (value) {
                  var value$1 = Js_option.getExn(Js_json.decodeObject(value));
                  var match = Js_dict.get(value$1, "id");
                  var tmp;
                  if (match !== undefined) {
                    var value$2 = Caml_option.valFromOption(match);
                    var match$1 = Js_json.decodeString(value$2);
                    tmp = match$1 !== undefined ? match$1 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$2));
                  } else {
                    tmp = Js_exn.raiseError("graphql_ppx: Field id on type Post is missing");
                  }
                  var match$2 = Js_dict.get(value$1, "title");
                  var tmp$1;
                  if (match$2 !== undefined) {
                    var value$3 = Caml_option.valFromOption(match$2);
                    var match$3 = Js_json.decodeString(value$3);
                    tmp$1 = match$3 !== undefined ? match$3 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$3));
                  } else {
                    tmp$1 = Js_exn.raiseError("graphql_ppx: Field title on type Post is missing");
                  }
                  return {
                          id: tmp,
                          title: tmp$1
                        };
                })) : Js_exn.raiseError("graphql_ppx: Field posts on type Subreddit is missing")
      };
    }
  } else {
    tmp = undefined;
  }
  return {
          subreddit: tmp
        };
}

function make(name, param) {
  return {
          query: ppx_printed_query,
          variables: Js_dict.fromArray(/* array */[/* tuple */[
                    "name",
                    name
                  ]].filter((function (param) {
                      return Caml_obj.caml_notequal(param[1], null);
                    }))),
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
                  ]].filter((function (param) {
                      return Caml_obj.caml_notequal(param[1], null);
                    }))),
          parse: parse
        };
}

function ret_type(f) {
  return { };
}

var MT_Ret = { };

var SubredditQuery = {
  ppx_printed_query: ppx_printed_query,
  query: ppx_printed_query,
  parse: parse,
  make: make,
  makeWithVariables: makeWithVariables,
  ret_type: ret_type,
  MT_Ret: MT_Ret
};

function Subreddit(Props) {
  var name = Props.name;
  var query = make(name, /* () */0);
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

var make$1 = Subreddit;

var $$default = Subreddit;

export {
  ste ,
  SubredditQuery ,
  make$1 as make,
  $$default ,
  $$default as default,
  
}
/* react Not a pure module */
