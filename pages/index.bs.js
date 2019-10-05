// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Hoc from "../src/bindings/Hoc.bs.js";
import * as React from "react";
import * as Js_exn from "bs-platform/lib/es6/js_exn.js";
import * as Js_dict from "bs-platform/lib/es6/js_dict.js";
import * as Js_json from "bs-platform/lib/es6/js_json.js";
import * as Caml_obj from "bs-platform/lib/es6/caml_obj.js";
import * as Subreddit from "../src/components/Subreddit.bs.js";
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
          var field_posts;
          if (match$4 !== undefined) {
            var value$2 = Caml_option.valFromOption(match$4);
            var match$5 = Js_json.decodeArray(value$2);
            field_posts = match$5 !== undefined ? match$5.map((function (value) {
                      var match = Js_json.decodeObject(value);
                      if (match !== undefined) {
                        var value$1 = Caml_option.valFromOption(match);
                        var match$1 = Js_dict.get(value$1, "id");
                        var field_id;
                        if (match$1 !== undefined) {
                          var value$2 = Caml_option.valFromOption(match$1);
                          var match$2 = Js_json.decodeString(value$2);
                          field_id = match$2 !== undefined ? match$2 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$2));
                        } else {
                          field_id = Js_exn.raiseError("graphql_ppx: Field id on type Post is missing");
                        }
                        var match$3 = Js_dict.get(value$1, "title");
                        var field_title;
                        if (match$3 !== undefined) {
                          var value$3 = Caml_option.valFromOption(match$3);
                          var match$4 = Js_json.decodeString(value$3);
                          field_title = match$4 !== undefined ? match$4 : Js_exn.raiseError("graphql_ppx: Expected string, got " + JSON.stringify(value$3));
                        } else {
                          field_title = Js_exn.raiseError("graphql_ppx: Field title on type Post is missing");
                        }
                        return /* record */[
                                /* id */field_id,
                                /* title */field_title
                              ];
                      } else {
                        return Js_exn.raiseError("graphql_ppx: Expected object of type Post, got " + JSON.stringify(value));
                      }
                    })) : Js_exn.raiseError("graphql_ppx: Expected array, got " + JSON.stringify(value$2));
          } else {
            field_posts = Js_exn.raiseError("graphql_ppx: Field posts on type Subreddit is missing");
          }
          tmp$1 = /* record */[/* posts */field_posts];
        } else {
          tmp$1 = Js_exn.raiseError("graphql_ppx: Expected object of type Subreddit, got " + JSON.stringify(value$1));
        }
        tmp = tmp$1;
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

function Index(Props) {
  return React.createElement(Subreddit.make, {
              name: "reactJs"
            });
}

var $$default = Hoc.Apollo.withApollo(Index);

var make$1 = Index;

var index = Index;

export {
  ste ,
  SubredditQuery ,
  make$1 as make,
  index ,
  $$default ,
  $$default as default,
  
}
/* default Not a pure module */
