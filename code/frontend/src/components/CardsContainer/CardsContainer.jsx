import React from "react";
import FeedCard from "../FeedCard";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import RightbarProfile from "../RightbarProfile/RightbarProfile";

import "./cardContainer.css";

export default function CardsContainer(props) {
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState([]);

  const { usernames } = useParams();

  const location = useLocation();
  let extraData = location.state ? location.state.email : "Default value";

  console.log("email", extraData);

  const email = "kavi@gmail.com";
  // const email = localStorage.getItem("email");

  // to determine which route we are in. (profile or home)
  // If we are in profile we render only relevant user's posts.
  let fetchUrl = "";
  props.whichRoute === "home_feed"
    ? (fetchUrl = "http://localhost:5000/api/getpost/getfiles/")
    : (fetchUrl = `http://localhost:5000/api/getpost/getfiles/${email}`);

  useEffect(() => {
    fetch(fetchUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const promises = data.map((post) => {
          return fetch(
            `http://localhost:5000/api/user-data?email=${post.email}`
          )
            .then((response) => response.json())
            .then((user) => {
              return {
                ...post,
                avatarImage: `data:image/png;base64,${user.image}`,
                username: user.userName,
              };
            });
        });

        Promise.all(promises).then((postsWithAvatars) => {
          setPosts(postsWithAvatars);
        });
        setPosts(data);
      });
  }, [props.whichRoute]);

  // get the user's data
  useEffect(() => {
    fetch(`http://localhost:5000/api/user-data?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // buffer data to data URL.
  function bufferToDataURL(buffer, type) {
    let binary = "";
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return `data:${type};base64,${window.btoa(binary)}`;
  }

  return (
    <>
      {/* we have this on feed only on mobile. and only when we are in the profile page */}
      {props.whichRoute === "home_feed" ? (
        ""
      ) : (
        <div className="profileAboveCards">
          <RightbarProfile></RightbarProfile>
        </div>
      )}

      {posts.map((post, index) => (
        <FeedCard
          mainUsername={userData.userName}
          mainUserImage={`data:image/png;base64,${userData.image}`}
          id={post._id}
          key={index}
          avatarImage={post.avatarImage}
          image={bufferToDataURL(post.image.data, "image/png")}
          email={post.email}
          username={post.username}
          date={post.date}
          caption={post.caption}
          reacts={post.reactions.users}
          reacts_count={post.reactions.count}
          comments={post.comments}
          comments_count={post.commentsCount}
          code_counts={post.code_counts}
          object_counts={post.object_counts}
          shares={post.shares}
          shares_count={post.shares_count}
        />
      ))}
    </>
  );
}
