import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../utils/api";
import HomePage from "./HomePage";

function LoginPage() {
  const [username, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [authedUser, setAuthedUser] = React.useState(null);

  const navigate = useNavigate();
  const onEmailChangeHandler = (e) => {
    setUserName(e.target.value);
  };
  const onPasswordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  function putAccessToken(accessToken) {
    return localStorage.setItem("accessToken", accessToken);
  }

  async function onLogin(event) {
    event.preventDefault();

    const { meta, data } = await login({ username, password });
    setAuthedUser(data);
    if (!meta) {
      loginSuccess(data.token);
      console.log(data.token);
    }
  }
  const loginSuccess = (accessToken) => {
    putAccessToken(accessToken);
    // const { data } = await onLogin({ username, password });
    navigate("/");
  };

  if (authedUser === null) {
    return (
      <div className="container col-xl-10 col-xxl-8 px-4 py-5">
        <div className="row align-items-center g-lg-5 py-5">
          <div className="col-lg-7 text-center text-lg-start">
            <h1 className="display-4 fw-bold lh-1 mb-3">
              Vertically centered hero sign-up form
            </h1>
            <p className="col-lg-10 fs-4">
              Below is an example form built entirely with Bootstrap’s form
              controls. Each required form group has a validation state that can
              be triggered by attempting to submit the form without completing
              it.
            </p>
          </div>
          <div className="col-md-10 mx-auto col-lg-5">
            <form
              onSubmit={(e) => onLogin(e)}
              className="p-4 p-md-5 border rounded-3 bg-light"
            >
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingInput"
                  value={username}
                  onChange={onEmailChangeHandler}
                  placeholder="username"
                />
                <label>Username</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={onPasswordChangeHandler}
                  id="floatingPassword"
                  placeholder="Password"
                />
                <label>Password</label>
              </div>
              <button className="w-100 btn btn-lg btn-primary" type="submit">
                Sign up
              </button>
              <small className="text-muted">
                By clicking <Link to="/register">Sign up</Link>, you agree to
                the terms of use.
              </small>
            </form>
          </div>
        </div>
      </div>
    );
  }
  return <HomePage />;
}

export default LoginPage;
