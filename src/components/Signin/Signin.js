import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Api from "../../helper/api";

export default function Signin({ signinHandler }) {
  const [formData, setFormData] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const onChnageHandler = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const onSubmitHandler = event => {
    event.preventDefault();
    new Api()
      .signIn(formData)
      .then(response => signinHandler(response.data))
      .catch(error => setErrMsg(error.response.data));
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center background-ivory">
      <main className="pa4 black-80">
        <div className="measure">
          <form onSubmit={onSubmitHandler}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-white w-100"
                  type="email"
                  name="email"
                  id="email"
                  onChange={onChnageHandler}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={onChnageHandler}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                style={{ backgroundColor: "#97d9e1" }}
                type="submit"
                value="Sign in"
              />
            </div>
          </form>

          <div className="lh-copy mt3">
            <Link
              to="register"
              className="f6 link underline dim black db pointer"
            >
              Not a memeber? Sign Up
            </Link>
          </div>
          <div className="lh-copy mt3 f6 red b">{errMsg}</div>
        </div>
      </main>
    </article>
  );
}

Signin.propTypes = {
  signinHandler: PropTypes.func.isRequired
};
