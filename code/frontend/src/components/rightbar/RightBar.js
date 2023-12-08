import { Button } from "@mui/material";
import rightbar from "./rightbar.css";

import AppButton from "../uploadbutton/AppButton";

export default function RightBar() {
  return (
    <div className="rightBar">
      <div className="rightBarWrapper">
        <div className="writeSomethingDev">
          <p className="writeSomething">Write Something...</p>
          <textarea
            className="writeSomethingTextArea"
            placeholder="Say hi to cubers..."
          ></textarea>
        </div>

        <div className="photoButtonDiv">
          <AppButton title="Upload Image" />
        </div>
        <div className="videoButtonDiv">
          <AppButton title="Upload Video" />
        </div>
        <div className="codeButtonDiv">
          <AppButton title="Upload Code" />
        </div>
      </div>
      <div className="rightBarFriends"></div>
    </div>
  );
}
