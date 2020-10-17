import React from "react";
import PropTypes from "prop-types";

export default function Rank({ user }) {
  return (
    <div>
      <div className="f3">{`${user.name}, your current entries count is...`}</div>
      <div className="f1">{`#${user.entries}`}</div>
    </div>
  );
}

Rank.propTypes = {
  user: PropTypes.object.isRequired
};
