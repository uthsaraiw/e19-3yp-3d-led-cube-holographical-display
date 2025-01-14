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

  // decide which data to render my profile or other's profile.
  let email = "";

  if (usernames) {
    email = location.state ? location.state.email : "Default value";
  } else {
    // email = "kavi@gmail.com";
    email = localStorage.getItem("email");
  }

  // to determine which route we are in. (profile or home)
  // If we are in profile we render only relevant user's posts.

  // console.log("where am i ", props.whichRoute);

  // Get post data
  useEffect(() => {
    let fetchUrl = "";
    props.whichRoute === "home_feed"
      ? (fetchUrl = "http://16.171.4.112:5000/api/getpost/getfiles/")
      : (fetchUrl = `http://16.171.4.112:5000/api/getpost/getfiles/${email}`);
    fetch(fetchUrl)
      .then((response) => response.json())
      .then((data) => {
        const promises = data.map((post) => {
          return fetch(
            `http://16.171.4.112:5000/api/user-data?email=${post.email}`
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
          //console.log(postsWithAvatars);
          console.log(posts);
        });
      });
  }, [props.whichRoute, email]);

  // get the main user's data
  useEffect(() => {
    fetch(`http://16.171.4.112:5000/api/user-data?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, [props.whichRoute, email]);

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
          mainUserImage={
            userData.image ? `data:image/png;base64,${userData.image}` : null
          }
          id={post._id}
          key={index}
          avatarImage={post.avatarImage}
          email={post.email}
          postUsername={post.username}
          date={post.createdAt}
          caption={post.caption}
          reacts={post.reactions.users}
          reacts_count={post.reactions.count}
          comments={post.comments}
          comments_count={post.commentsCount}
          code_counts={post.downloadCountCode}
          object_counts={post.downloadCountObject}
          shares={post.shareCount}
          shares_count={post.shareCount}
          image={
            post.image ? bufferToDataURL(post.image.data, "image/png") : null
          }
        />
      ))}
    </>
  );
}
