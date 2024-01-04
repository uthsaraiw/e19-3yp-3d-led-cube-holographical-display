import React from "react";
import "./postWindow.css";

import ImageButton from "../ImageButton/ImageButton";
import AppButton from "../AppButton/AppButton";

function PostWindow(props) {
  return (
    <div className="PostMainComponent">
      <div className="postContainer">
        <h2 className="createPost">Create Post</h2>
        <div className="postPreview">
          <div className="previewElement">
            <img src="./assets/card1.jpeg" className="imagePreview"></img>
          </div>
          <p className="note">Attach your resource</p>

          <div className="objectPicker">
            <ImageButton
              title="Photo"
              backgroundColor="black"
              imageLink="./assets/Photo.svg"
            ></ImageButton>
            <ImageButton
              title="Video"
              backgroundColor="black"
              imageLink="./assets/Video.svg"
            ></ImageButton>
            <ImageButton
              title="Code"
              backgroundColor="black"
              imageLink="./assets/Code.svg"
            ></ImageButton>
            <ImageButton
              title="Object"
              backgroundColor="black"
              imageLink="./assets/Object.svg"
            ></ImageButton>
          </div>

          <AppButton title="Share to Cubers" className="shareBtn"></AppButton>
        </div>
      </div>
    </div>
  );
}

export default PostWindow;
