// this contains main feed

import colors from "../../styles/colors";
import FeedCard from "../FeedCard";
import CardsContainer from "../CardsContainer/CardsContainer";
import feed from "./feed.css";
import { Home, ViewInAr, AccountCircle } from "@mui/icons-material";
import UploadContainer from "../UploadContainer/uploadContainer";

export default function Feed() {
  return (
    <div className="feed">
      <div className="mainNav" style={{ backgroundColor: colors.Black }}>
        <div className="LED">
          <ViewInAr className="mainNavImage" />
        </div>
        <div className="home">
          <Home className="mainNavImageHome" />
        </div>
        <div className="myProfile">
          <AccountCircle className="mainNavImage" />
        </div>
      </div>

      <UploadContainer />
    </div>
  );
}
