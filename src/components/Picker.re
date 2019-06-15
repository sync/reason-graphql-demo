[@react.component]
let make =
    (
      ~options,
      ~valueUseState as (value, setValue)=React.useState(
                                             Belt.(
                                               () =>
                                                 options
                                                 ->Array.get(0)
                                                 ->Option.getWithDefault(
                                                     "Not provided...",
                                                   )
                                             ),
                                           ),
      ~value=value,
      ~onChange=setValue,
      ~className=?,
    ) => {
  let className = Cn.make([className->Cn.unpack]);

  let select =
    TestUtils.withTestID(
      ~testID="picker-select-test-id",
      <select
        onChange={event => onChange(event->ReactEvent.Form.target##value)}
        value>
        {React.array(
           options->Belt.Array.map(option =>
             <option value=option key=option> {React.string(option)} </option>
           ),
         )}
      </select>,
    );

  <span className>
    <h1> {React.string({j|Subreddit: $value|j})} </h1>
    select
  </span>;
};

[@genType]
let default = make;
