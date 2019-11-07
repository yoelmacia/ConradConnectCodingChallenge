import React from "react";
import "./Welcome.css";

export default class Welcome extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="container-div">Welcome Github API</div>
        <a
          className="container-link"
          href="https://github.com/login/oauth/authorize?client_id=723d03ab329e99ca2336&scope=public_repo"
        >
          Sign up with github
        </a>
      </div>
    );
  }
}
