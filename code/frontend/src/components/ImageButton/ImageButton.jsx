import React from "react";

import "./imageButton.css";

function ImageButton(props) {
  return (
    <div
      className="btnContainer"
      style={{ "--background-color": props.backgroundColor }}
    >
      <img src={props.imageLink} className="btnImage" alt="SVG Icon" />
      <p className="btnTitle">{props.title}</p>
    </div>
  );
}

export default ImageButton;
