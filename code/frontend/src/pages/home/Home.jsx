import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import RightBar from "../../components/rightbar/RightBar";
import TopBar from "../../components/topbar/TopBar";
import Feed from "../../components/feed/Feed";
import PostWindow from "../../components/PostWindow/PostWindow";
import SignUp from "../../components/SignUp/SignUp";
import "./home.css";
import { MyProvider } from "../../components/Contexts/MyProvider";

export default function Home() {
  return (
    <>
      {/* <Tester></Tester> */}

      <MyProvider>
        <Router>
          <div>
            <TopBar />

            <Routes>
              <Route
                path="/"
                element={
                  <SignUp mainTitle="Login" buttonTitle="Start Cubing" />
                }
              />

              <Route
                path="/register"
                element={
                  <SignUp mainTitle="Register" buttonTitle="Become a Cuber" />
                }
              />
              <Route path="/post" element={<PostWindow />} />
              <Route
                path="/upload"
                element={
                  <div className="homeContainer">
                    <div className="feedContainer">
                      <Feed componentToRender="upload"></Feed>
                    </div>
                    <div className="rightbarContainer">
                      <RightBar componentToRender="post"></RightBar>
                    </div>
                  </div>
                }
              />

              <Route
                path="/home_feed"
                element={
                  <div className="homeContainer">
                    <div className="feedContainer">
                      <Feed componentToRender="card"></Feed>
                    </div>
                    <div className="rightbarContainer">
                      <RightBar componentToRender="profile"></RightBar>
                    </div>
                  </div>
                }
              />

              <Route
                path="/profile_feed"
                element={
                  <div className="homeContainer">
                    <div className="feedContainer">
                      <Feed componentToRender="card"></Feed>
                    </div>
                    <div className="rightbarContainer">
                      <RightBar componentToRender="profile"></RightBar>
                    </div>
                  </div>
                }
              />
            </Routes>
          </div>
        </Router>
      </MyProvider>
    </>
  );
}
