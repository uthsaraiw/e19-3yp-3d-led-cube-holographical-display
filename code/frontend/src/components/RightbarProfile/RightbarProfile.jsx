import React from "react";

import "./rightbarProfile.css";

import ImageButton from "../ImageButton/ImageButton";
import AppButton from "../AppButton/AppButton";

export default function RightbarProfile() {
  return (
    <div className="mainContainerRight">
      <div className="profileContainer">
        <img src="./assets/Profile.jpg" className="profilePic"></img>
        <h3 className="profileName">Cuber 404</h3>
        <div className="followerContainer">
          <div className="followers">
            <p className="numberOfFollowers">34</p>
            <p>Followers</p>
          </div>
          <div className="followers">
            <p className="numberOfFollowers">56</p>
            <p>Following</p>
          </div>
        </div>
      </div>

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
