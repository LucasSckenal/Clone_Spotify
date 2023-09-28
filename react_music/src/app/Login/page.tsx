import React from "react";
import "./style.scss";

function Login() {
  return (
    <div className="container-login">
      <h1>logo</h1>
      <div className="container-form">
        <div className="redirect">
          <button>SIGN IN</button>
          <button>SIGN UP</button>
        </div>

        <input type="text" />
        <input type="text" />

        <div className="checkbox">
          <input type="checkbox" name="" id="" />
          <p>Stay signed in</p>
        </div>
        <button>SIGN IN</button>
      </div>
    </div>
  );
}

export default Login;
