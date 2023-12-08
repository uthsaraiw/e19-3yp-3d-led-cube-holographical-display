import RightBar from "../../components/rightbar/RightBar";
import TopBar from "../../components/topbar/TopBar";
import Feed from "../../components/feed/Feed";

import home from "./home.css";

export default function Home() {
  return (
    <>
      <TopBar></TopBar>

      <div className="homeContainer">
        <Feed></Feed>
        <RightBar></RightBar>
      </div>
    </>
  );
}
