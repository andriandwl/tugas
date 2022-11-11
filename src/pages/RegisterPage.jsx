import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../utils/api";

function RegisterPage() {
  const [name, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onEmailChangeHandler = (e) => {
    setEmail(e.target.value);
  };
  const onNameChangeHandler = (e) => {
    setNama(e.target.value);
  };
  const onPasswordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const onUsernameChangeHandler = (e) => {
    setUsername(e.target.value);
  };

  const onRegisterHandler = async (e) => {
    e.preventDefault();
    const { meta } = await register({
      name: name,
      email: email,
      username: username,
      password: password,
    });
    console.log(meta);

    if (!meta) {
      navigate("/login");
    }
  };

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
            be triggered by attempting to submit the form without completing it.
          </p>
        </div>
        <div className="col-md-10 mx-auto col-lg-5">
          <form
            className="p-4 p-md-5 border rounded-3 bg-light"
            method="post"
            onSubmit={onRegisterHandler}
            encType="multipart/form-data"
            id="form-input__register"
          >
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                onChange={onNameChangeHandler}
                value={name}
                id="input-nama"
                name="input-nama"
                placeholder="name@example.com"
              />
              <label>Nama</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="email"
                onChange={onEmailChangeHandler}
                className="form-control"
                id="input-email"
                value={email}
                placeholder="email"
              />
              <label>Email address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                onChange={onUsernameChangeHandler}
                id="input-username"
                name="input-nama"
                value={username}
              />
              <label>Username</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                onChange={onPasswordChangeHandler}
                id="input-password"
                value={password}
                placeholder="Password"
              />
              <label>Password</label>
            </div>
            <button
              id="btn-register"
              name="input-password"
              className="w-100 btn btn-lg"
              style={{ color: "white", backgroundColor: "#90bcab" }}
              type="submit"
            >
              Sign up
            </button>
            <hr className="my-4" />
            <small className="text-muted">
              Already Have Account? Please
              <Link style={{ color: "#90bcab" }} to="/login">
                Login
              </Link>
            </small>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
