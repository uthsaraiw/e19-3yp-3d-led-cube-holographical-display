import React from "react";

import "./appInput.css";

export default function AppInput(props) {
  return (
    <input
      className="appInput"
      type={props.type}
      onChange={props.handleInputChange}
    ></input>
  );
}
