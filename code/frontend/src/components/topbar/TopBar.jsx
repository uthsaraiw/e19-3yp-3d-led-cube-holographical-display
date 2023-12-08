import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";

export default function TopBar() {
  return (
    <div className="topBarContainer">
      <div className="topBarLeft">
        <span className="logo">HoloCube</span>
      </div>

      <div className="topBarCenter">
        <div className="searchBar">
          <Search className="searchIcon"/>
          <input className="searchInput" placeholder="Search here..."></input>
        </div>
      </div>

      <div className="topBarRight">
        <div className="topBarLinks">
          <div className="timeLine">Timeline</div>
          <div className="home">Home</div>
        </div>

        <div className="topBarItems">
          <div className="topBarItemIcon">
            <Person />
            <span className="topBarIconBadge">1</span>
          </div>
          <div className="topBarItemIcon">
            <Chat />
            <span className="topBarIconBadge">1</span>
          </div>
          <div className="topBarItemIcon">
            <Notifications />
            <span className="topBarIconBadge">1</span>
          </div>
        </div>

        <img src="/assets/person/1.jpeg" alt="" className="topBarImg" />
      </div>
    </div>
  );
}
