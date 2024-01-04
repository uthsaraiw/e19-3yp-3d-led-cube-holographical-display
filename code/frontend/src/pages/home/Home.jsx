import RightBar from "../../components/rightbar/RightBar";
import TopBar from "../../components/topbar/TopBar";
import Feed from "../../components/feed/Feed";
import PostWindow from "../../components/PostWindow/PostWindow";
import SignUp from "../../components/SignUp/SignUp";

import "./home.css";

export default function Home() {
  return (
    <>
      <TopBar></TopBar>
      <SignUp mainTitle="Register" buttonTitle="Become a Cuber "></SignUp>

      {/* <PostWindow></PostWindow> */}
      {/* <div className="homeContainer">
        <div className="feedContainer">
          <Feed></Feed>
        </div>
        <div className="rightbarContainer">
          <RightBar></RightBar>
        </div>
      </div> */}
    </>
  );
}
