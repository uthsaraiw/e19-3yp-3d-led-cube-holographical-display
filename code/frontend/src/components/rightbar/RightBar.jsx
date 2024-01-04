import { Button } from "@mui/material";

import "./rightbar.css";

import RightbarPost from "../RightbarPost/RightbarPost";
import RightbarProfile from "../RightbarProfile/RightbarProfile";

// this contains the right bar.

export default function RightBar() {
  return (
    <div className="rightBar">
      <RightbarPost></RightbarPost>
    </div>
  );
}
