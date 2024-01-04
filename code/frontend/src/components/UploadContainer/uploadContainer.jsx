import React from "react";
import AppButton from "../AppButton/AppButton";

import uploadContainer from "./uploadContainer.css";

export default function UploadContainer() {
  return (
    <div className="mainContainer">
      <div className="topContainer">
        <AppButton title="Upload Object" width="150px"></AppButton>
        <AppButton title="Upload Code" width="150px"></AppButton>
      </div>
      <div className="previewContainer">
        <img src="../assets/card1.jpeg" className="image"></img>
      </div>

      <div className="bottomContainer">
        <AppButton title="Show In My Cube"></AppButton>
      </div>
    </div>
  );
}
