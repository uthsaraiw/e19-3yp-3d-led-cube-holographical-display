import React from "react";

import "./rightbarPost.css";
import AppButton from "../AppButton/AppButton";
import ImageButton from "../ImageButton/ImageButton";

function RightbarPost(props) {
  return (
    <div className="mainContainerRight">
      <div className="writeSomethingDev">
        <textarea
          className="writeSomethingTextArea"
          placeholder="Say hi to cubers..."
        ></textarea>
        <AppButton title="Post" width="200px" />
      </div>

      <div className="buttonsContainer">
        <ImageButton
          title="Photo"
          className="imageBtn"
          imageLink="./assets/Photo.svg"
        ></ImageButton>
        <ImageButton
          title="Video"
          className="imageBtn"
          imageLink="./assets/Video.svg"
        ></ImageButton>
        <ImageButton
          title="Code"
          className="imageBtn"
          imageLink="./assets/Code.svg"
        ></ImageButton>
        <ImageButton
          title="Object"
          className="imageBtn"
          imageLink="./assets/Object.svg"
        ></ImageButton>
      </div>
    </div>
  );
}

export default RightbarPost;
