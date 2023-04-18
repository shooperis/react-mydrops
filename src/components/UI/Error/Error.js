import Logo from "../../Logo/Logo";

import "./Error.scss";

const Error = (props) => {
  return (
    <div className="container something-went-wrong">
      <header className="header">
        <Logo />
      </header>

      <div className="content">
        <h1 className="title">Something went wrong!</h1>

        {props.message && props.message}
      </div>
    </div>
  );
};

export default Error;
