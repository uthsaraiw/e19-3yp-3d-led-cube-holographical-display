import React from "react";
import FeedCard from "../FeedCard";
import { useState, useEffect } from "react";

export default function CardsContainer() {
  const [posts, setPosts] = useState([]);

  // get in touch with the backend to retrieve the posts.
  useEffect(() => {
    fetch("http://localhost:3001/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  // to get the profile image of the user -  we can use the user id to get the profile image from the database.
  // for loop fet avtar fpr each post.

  for (const post of posts) {
    cuber_name = post.cuber_name;
    //
    avatar = "https://i.pravatar.cc/300?u=1";

    const newPosts = data.map((post) => ({
      ...post,
      avatar: "https://i.pravatar.cc/300?u=" + post.cuber_name,
    }));

    setPosts(newPosts);

    console.log(post);
  }

  return (
    <>
      <>
        {posts.map((post, index) => (
          <FeedCard
            key={index}
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
    </>
  );
}

//
