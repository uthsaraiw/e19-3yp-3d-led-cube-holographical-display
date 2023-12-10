import colors from "../../styles/colors";
import FeedCard from "../FeedCard";
import feed from "./feed.css";
import { Home, ViewInAr, AccountCircle } from "@mui/icons-material";

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
      <div className="cardsCantainer">
        <FeedCard />
        <FeedCard />
      </div>
    </div>
  );
}
