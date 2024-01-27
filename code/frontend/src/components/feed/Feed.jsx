// this contains main feed

import colors from "../../styles/colors";
import FeedCard from "../FeedCard";
import CardsContainer from "../CardsContainer/CardsContainer";
import feed from "./feed.css";
import { Home, ViewInAr, AccountCircle } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import UploadContainer from "../UploadContainer/uploadContainer";

export default function Feed(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const goToUpload = () => {
    navigate("/upload");
  };
  const goToHomeFeed = () => {
    navigate("/home_feed");
  };

  const goToMyProfile = () => {
    navigate("/profile_feed");
  };
  return (
    <div className="feed">
      <div className="mainNav" style={{ backgroundColor: colors.Black }}>
        <div className="LED" onClick={goToUpload}>
          <ViewInAr
            className="mainNavImage"
            sx={{
              color: location.pathname === "/upload" ? colors.Purple : "white",
            }}
          />
        </div>
        <div className="home" onClick={goToHomeFeed}>
          <Home
            className="mainNavImageHome"
            sx={{
              color:
                location.pathname === "/home_feed" ? colors.Purple : "white",
            }}
          />
        </div>
        <div className="myProfile" onClick={goToMyProfile}>
          <AccountCircle
            className="mainNavImage"
            sx={{
              color:
                location.pathname === "/profile_feed" ? colors.Purple : "white",
            }}
          />
        </div>
      </div>
      <div className="kkk">
        {props.componentToRender === "card" ? (
          <CardsContainer whichRoute={props.whichRoute} />
        ) : (
          <UploadContainer />
        )}
      </div>
    </div>
  );
}
