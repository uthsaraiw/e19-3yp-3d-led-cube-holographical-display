import colors from "../../styles/colors";
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";

export default function TopBar() {
  return (
    <div className="topBarContainer" style={{ backgroundColor: colors.Black }}>
      <div className="topBarLeft" style={{ backgroundColor: colors.Black }}>
        <img src="/assets/logo.png" alt="" className="logoImg" />
        <span className="logo" style={{ color: colors.White }}>
          HoloCube
        </span>
      </div>

      <div className="topBarCenter" style={{ backgroundColor: colors.Black }}>
        <div className="searchBar">
          <Search className="searchIcon" />
          <input
            className="searchInput"
            placeholder="Search here..."
            style={{ backgroundColor: colors.BlackLow }}
          ></input>
        </div>
      </div>

      <div className="topBarRight">
        <div className="notifications">
          <Notifications
            className="notificationIcon"
            style={{ color: colors.White, backgroundColor: colors.BlackLow }}
          />
          {/* <span className="topBarIconBadge">2</span> */}
        </div>
      </div>
    </div>
  );
}
