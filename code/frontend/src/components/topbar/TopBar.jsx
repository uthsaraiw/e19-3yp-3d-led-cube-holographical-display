import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Help,
  Notifications,
  ManageAccounts,
} from "@mui/icons-material";

import colors from "../../styles/colors";
import "./topbar.css";

export default function TopBar() {
  const [searchBarText, setSearchBarText] = useState("");

  const navigate = useNavigate();

  // search bar
  const changeSearchBarText = (event) => {
    const searchBarText = event.target.value;
    setSearchBarText(searchBarText);
  };

  // go to settings
  const goToSettings = (event) => {
    navigate("/settings");
  };

  // go to home
  const goToHome = (event) => {
    navigate("/profile_feed");
  };

  return (
    <div
      className="topBarContainer"
      style={{ backgroundColor: colors.Black, cursor: "pointer" }}
    >
      <div
        className="topBarLeft"
        style={{ backgroundColor: colors.Black }}
        onClick={goToHome}
      >
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
            placeholder="Search ..."
            style={{ backgroundColor: colors.BlackLow }}
            onChange={changeSearchBarText}
          ></input>
        </div>
      </div>

      <div className="topBarRight">
        <div className="notifications">
          <Notifications
            className="notificationIcon"
            style={{ color: colors.White, backgroundColor: colors.BlackLow }}
          />
        </div>
        <div className="notifications" onClick={goToSettings}>
          <ManageAccounts
            className="notificationIcon"
            style={{ color: colors.White, backgroundColor: colors.BlackLow }}
          />
        </div>
        <div className="notifications">
          <Help
            className="notificationIcon"
            style={{ color: colors.White, backgroundColor: colors.BlackLow }}
          />
        </div>
      </div>
    </div>
  );
}
