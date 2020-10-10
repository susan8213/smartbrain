import React from "react";
import "./ImageLinkForm.css";

export default function ImageLinkForm() {
  return (
    <div>
      <p className="f3 silver">
        {"The Magic Brain will detect faces in your pictures. Give it a try."}
      </p>
      <div className="center">
        <div className="form center pa4 br3 shadow-5">
          <input className="f4 pa2 w-70" type="text" />
          <button className="f4 background-gredient link w-30 grow ph3 pv2 dib center">
            Detect
          </button>
        </div>
      </div>
    </div>
  );
}
