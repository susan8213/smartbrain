import React from "react";
import PropTypes from "prop-types";
import "./FaceRecognition.css";

export default function FaceRecognition({ imageUrl, boxes }) {
  return (
    <div className="center">
      <div className="absolute mt2">
        <img src={imageUrl} alt="" width="500px" height="auto" />
        {boxes.map((box, index) => (
          <div className="bounding-box" key={index} style={box}></div>
        ))}
      </div>
    </div>
  );
}

FaceRecognition.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  boxes: PropTypes.array.isRequired
};
