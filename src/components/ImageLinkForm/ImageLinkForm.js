import React from "react";
import PropTypes from "prop-types";
import "./ImageLinkForm.css";

export default function ImageLinkForm({ onInputChange, onSubmitHandler }) {
  const onKeyPressHandler = event => {
    if (event.key === "Enter") {
      onSubmitHandler();
    }
  };
  return (
    <div>
      <p className="f3 silver">
        {"The Magic Brain will detect faces in your pictures. Give it a try."}
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70"
            type="text"
            onChange={onInputChange}
            onKeyPress={onKeyPressHandler}
          />
          <button
            className="f4 background-gredient link w-30 grow ph3 pv2 dib center"
            onClick={onSubmitHandler}
          >
            Detect
          </button>
        </div>
      </div>
    </div>
  );
}

ImageLinkForm.propTypes = {
  onInputChange: PropTypes.func.isRequired,
  onSubmitHandler: PropTypes.func.isRequired
};
