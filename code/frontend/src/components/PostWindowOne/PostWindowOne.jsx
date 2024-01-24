import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";

import "./postWindowOne.css";
import AppButton from "../AppButton/AppButton";

function PostWindowOne(props) {
  // for navigation
  const navigate = useNavigate();

  const [postCaption, setPostCaption] = useState("");
  const [previewElement, setPreviewElement] = useState(null); // preview element - image or video.
  const [fileType, setFileType] = useState(""); // accepted file types. [image/*, video/*

  const formData = new FormData(); //  Create FormData to add post details.

  const email = "kavindu@gmail.com"; // get from login session

  const location = useLocation();
  const file = location.state.selectedFile;

  if (previewElement === null) {
    setPreviewElement(URL.createObjectURL(file));
  }
  if (fileType == "") {
    setFileType(file.type);
  }
  console.log(fileType);

  // Add data to from data object.
  formData.append("email", email);
  formData.append("caption", postCaption);

  formData.append("fileContent", file);

  // Post data to backend. -  when click the button.
  const sendPostData = () => {
    axios
      .post("http://localhost:5000/api/objectfile/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Update content type
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });

    navigate("/profile_feed");
  };

  return (
    <div className="PostMainComponent">
      <div className="postContainer">
        <h2 className="createPost">Create Post</h2>
        <div className="postPreview">
          <div className="textarea">
            <textarea
              className="textarea"
              placeholder="Write something about your post..."
              onChange={(e) => setPostCaption(e.target.value)}
            ></textarea>
          </div>
          <div className="previewElement">
            {fileType.startsWith("image/") ? (
              <img src={previewElement} className="imagePreview" alt="" />
            ) : fileType.startsWith("video/") ? (
              <video
                src={previewElement}
                className="imagePreview"
                alt=""
                controls
                autoPlay
              />
            ) : (
              <p>Invalid file type</p>
            )}
          </div>
          <AppButton
            title="Share to Cubers"
            className="shareBtn"
            onClickFunction={sendPostData}
          ></AppButton>
        </div>
      </div>
    </div>
  );
}

export default PostWindowOne;
