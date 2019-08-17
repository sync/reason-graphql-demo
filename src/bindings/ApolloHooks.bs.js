// Generated by BUCKLESCRIPT, PLEASE EDIT WITH CARE

import * as Block from "bs-platform/lib/es6/block.js";
import * as Curry from "bs-platform/lib/es6/curry.js";
import * as Js_dict from "bs-platform/lib/es6/js_dict.js";
import * as Caml_option from "bs-platform/lib/es6/caml_option.js";
import * as GraphqlTag from "graphql-tag";
import * as ReactHooks from "@apollo/react-hooks";

function useQuery(query) {
  var graphqlQueryAST = GraphqlTag.default(query.query);
  var options = Js_dict.fromList(/* :: */[
        /* tuple */[
          "variables",
          query.variables
        ],
        /* [] */0
      ]);
  var result = ReactHooks.useQuery(graphqlQueryAST, options);
  var match = result.loading;
  var match$1 = result.error;
  var match$2 = result.data;
  if (match) {
    return /* Loading */0;
  } else if (match$1 || match$2 === undefined) {
    return /* Error */Block.__(0, ["something is wrong"]);
  } else {
    return /* Data */Block.__(1, [Curry._1(query.parse, Caml_option.valFromOption(match$2))]);
  }
}

export {
  useQuery ,
  
}
/* graphql-tag Not a pure module */
