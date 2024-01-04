import React from "react";
import "./signUp.css";

import ImageButton from "../ImageButton/ImageButton";
import AppButton from "../AppButton/AppButton";
import AppInput from "../AppInput/AppInput";

function PostWindow(props) {
  return (
    <div className="PostMainComponent">
      <div className="postContainer">
        <h2 className="createPost">{props.mainTitle}</h2>
        <p className="email">Email</p>
        <AppInput></AppInput>

        <p className="password">Password</p>
        <AppInput></AppInput>

        <AppButton title={props.buttonTitle} className="shareBtn"></AppButton>
      </div>
    </div>
  );
}

export default PostWindow;
