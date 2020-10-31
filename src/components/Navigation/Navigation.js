import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function Navigation({ isSignedIn, signoutHandler }) {
  return (
    <nav style={{ display: "flex", justifyContent: "flex-end" }}>
      {isSignedIn ? (
        <p
          className="f4 pa3 link dim underline pointer"
          onClick={signoutHandler}
        >
          Sign out
        </p>
      ) : (
        <>
          <Link to="/login" className="f4 pa3 link dim underline pointer">
            Sign In
          </Link>
          <Link to="/register" className="f4 pa3 link dim underline pointer">
            Sign Up
          </Link>
        </>
      )}
    </nav>
  );
}

Navigation.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  signoutHandler: PropTypes.func.isRequired
};
