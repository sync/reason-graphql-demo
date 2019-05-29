type css = {
  .
  "header": string,
  "active": string,
};
[@bs.module] external css: css = "./Header.css";

[@react.component]
let make = (~className=?) => {
  let className = Cn.make([css##header, className->Cn.unpack]);

  <header className>
    <h1> {React.string("Reddit")} </h1>
    <nav>
      <ActiveLink href="/" activeClassName={css##active}>
        {React.string("Home")}
      </ActiveLink>
    </nav>
  </header>;
};

[@genType]
let default = make;
