import React, { useState } from "react";
import PropTypes from "prop-types";
import Api from "../../helper/api";

export default function Register({ registerHandler }) {
  const [formData, setFormData] = useState({});
  const [errMsg, setErrMsg] = useState("");
  const onChnageHandler = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const onSubmitHandler = event => {
    event.preventDefault();
    new Api()
      .signUp(formData)
      .then(response => registerHandler(response.data))
      .catch(error => setErrMsg(error.response.data));
    // registerHandler(formData);
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center background-ivory">
      <main className="pa4 black-80">
        <div className="measure">
          <form onSubmit={onSubmitHandler}>
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign Up</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Nickname
                </label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={onChnageHandler}
                />
              </div>
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
                value="Sign up"
              />
            </div>
            <div className="lh-copy mt3 f6 red b">{errMsg}</div>
          </form>
        </div>
      </main>
    </article>
  );
}

Register.propTypes = {
  registerHandler: PropTypes.func.isRequired
};
