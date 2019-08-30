module Link = {
  [@bs.module "next/link"] [@react.component]
  external make:
    (
      ~href: string=?,
      ~_as: string=?,
      ~prefetch: option(bool)=?,
      ~replace: option(bool)=?,
      ~shallow: option(bool)=?,
      ~passHref: option(bool)=?,
      ~children: React.element
    ) =>
    React.element =
    "default";
};

module Head = {
  [@bs.module "next/head"] [@react.component]
  external make: (~children: React.element) => React.element = "default";
};

module Error = {
  [@bs.module "next/head"] [@react.component]
  external make: (~statusCode: int, ~children: React.element) => React.element =
    "default";
};

module Router = {
  [@gentype]
  type t = {. "pathname": string};

  [@bs.module "next/router"] [@bs.return nullable]
  external useRouter: unit => option(t) = "useRouter";

  [@bs.send] external push: (t, ~url: string) => Js.Promise.t(bool) = "push";
};

module Apollo = {
  [@bs.module "../helpers/withApollo"]
  // takes a react component and returns a react component with the same signature
  external withApollo: React.component('props) => React.component('props) =
    "default";
};
