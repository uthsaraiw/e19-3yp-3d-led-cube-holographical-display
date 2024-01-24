import React from "react";
import FeedCard from "../FeedCard";
import { useState, useEffect } from "react";

export default function CardsContainer() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/getpost/getfiles/kavindu@gmail.com")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // const promises = data.map((post) => {
        //   return fetch(
        //     `http://localhost:3001/users?cuber_name=${post.cuber_name}`
        //   )
        //     .then((response) => response.json())
        //     .then((users) => {
        //       // Assuming the first user returned is the correct one

        //       console.log(users[0].image);
        //       if (users.length > 0) {
        //         return { ...post, avatarImage: users[0].image };
        //       } else {
        //         return post;
        //       }
        //     });
        // });

        // Promise.all(promises).then((postsWithAvatars) => {
        //   setPosts(postsWithAvatars);
        // });
        setPosts(data);
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
      {posts.map((post, index) => (
        <FeedCard
          key={index}
          avatarImage={post.avatarImage}
          image={bufferToDataURL(post.image.data, "image/png")}
          cuber_name={post.email}
          date={post.date}
          caption={post.caption}
          likes={post.likes}
          comments={post.comments}
          code_downloads={post.code_downloads}
          object_downloads={post.object_downloads}
          shares={post.shares}
        />
      ))}
    </>
  );
}
