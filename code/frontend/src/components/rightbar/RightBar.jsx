import { Button } from "@mui/material";

import "./rightbar.css";

import RightbarPost from "../RightbarPost/RightbarPost";
import RightbarProfile from "../RightbarProfile/RightbarProfile";

// this contains the right bar.

export default function RightBar(props) {
  return (
    <div className="rightBar">
      {props.componentToRender === "profile" ? (
        <RightbarProfile />
      ) : (
        <RightbarPost />
      )}
    </div>
  );
}
