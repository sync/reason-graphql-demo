type t = {
  .
  "pathname": string,
  "query": Js.Dict.t(string),
};

[@bs.module "url"] external format: t => string = "format";
