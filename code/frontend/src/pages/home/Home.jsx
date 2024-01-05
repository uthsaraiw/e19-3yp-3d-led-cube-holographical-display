import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";

import RightBar from "../../components/rightbar/RightBar";
import TopBar from "../../components/topbar/TopBar";
import Feed from "../../components/feed/Feed";
import PostWindow from "../../components/PostWindow/PostWindow";
import SignUp from "../../components/SignUp/SignUp";
import Tester from "../../components/test/Tester";

import "./home.css";

export default function Home() {
  return (
    <>
      {/* <Tester></Tester> */}
      <Router>
        <div>
          <TopBar />

          <Routes>
            <Route
              path="/"
              element={<SignUp mainTitle="Login" buttonTitle="Start Cubing" />}
            />

            <Route
              path="register"
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
    </>
  );
}
