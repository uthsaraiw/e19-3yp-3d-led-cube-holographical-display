import React from "react";
import FeedCard from "../FeedCard";
import { useState, useEffect } from "react";

export default function CardsContainer() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/posts")
      .then((response) => response.json())
      .then((data) => {
        const promises = data.map((post) => {
          return fetch(
            `http://localhost:3001/users?cuber_name=${post.cuber_name}`
          )
            .then((response) => response.json())
            .then((users) => {
              // Assuming the first user returned is the correct one

              console.log(users[0].image);
              if (users.length > 0) {
                return { ...post, avatarImage: users[0].image };
              } else {
                return post;
              }
            });
        });

        Promise.all(promises).then((postsWithAvatars) => {
          setPosts(postsWithAvatars);
        });
      });
  }, []);

  return (
    <>
      {posts.map((post, index) => (
        <FeedCard
          key={index}
          avatarImage={post.avatarImage}
          image={post.image}
          cuber_name={post.cuber_name}
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
