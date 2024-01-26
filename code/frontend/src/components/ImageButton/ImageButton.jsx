import React from "react";
import "./imageButton.css";

function ImageButton(props) {
  return (
    <div onClick={props.handleClick}>
      <div
        className="btnContainer"
        style={{ backgroundColor: props.backgroundColor }}
      >
        {props.imageLink ? (
          <img src={props.imageLink} className="btnImage" alt="SVG Icon" />
        ) : (
          ""
        )}
        <p className="btnTitle">{props.title}</p>
      </div>
    </div>
  );
}

export default ImageButton;
