[@bs.module "react-pin-input"] [@react.component]
external make:
  (~_type: [@bs.string] [ | `number | `custom], ~length: int) => React.element =
  "default";
