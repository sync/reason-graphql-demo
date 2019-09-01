module Apollo = {
  [@bs.module "../helpers/withApollo"]
  // takes a react component and returns a react component with the same signature
  external withApollo: React.component('props) => React.component('props) =
    "default";
};
