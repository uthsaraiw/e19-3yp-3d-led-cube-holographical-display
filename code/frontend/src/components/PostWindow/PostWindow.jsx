import React from "react";
import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

import "./postWindow.css";

import ImageButton from "../ImageButton/ImageButton";
import AppButton from "../AppButton/AppButton";
import InputMedia from "../InputMedia/InputMedia";

function PostWindow(props) {
  const [acceptedFileType, setAcceptedFileType] = useState("");
  //const [formData, setFormData] = useState(new FormData());

  const formData = useRef(new FormData());

  console.log("data");

  const userPostsCaption = localStorage.getItem("userPostsCaption");
  const email = "kavindu@gmail.com"; // get from login session

  // Add data to from data object. Because we use useEffect, this will be called when the component is only rendered.
  // or when the userPostsCaption or email is changed.
  useEffect(() => {
    formData.current.append("email", email);
    formData.current.append("caption", userPostsCaption);
  }, [email, userPostsCaption]);

  console.log(formData.current.get("email"));

  // for navigation
  const navigate = useNavigate();

  // input media files - this in to trigger the file input click event.
  const fileInputRef = useRef(null);

  // Function to trigger file input click.
  const handleButtonClick = async (fileType) => {
    await setAcceptedFileType(fileType);
    console.log(fileType);
    if (fileInputRef.current) {
      fileInputRef.current.click(); // when button clicks this one is called, and the input one also clicked.
    }
  };
 
  const sendPostDataButtonClick = () => {
    
  };

  // To handle file input. This function will be triggered when a file is selected.
  const handleFileChange = (event) => {
    console.log("handleFileChange executed");
    console.log("pos0");
    const selectedFile = fileInputRef.current.files[0];

    console.log('Selected File:', selectedFile);


    if (selectedFile) {
      console.log(selectedFile.type);

      // append selected file to form data, based on its type.
      if (selectedFile.type.startsWith("image")) {
        console.log("hello");
        formData.current.append("image", selectedFile);
      } else if ((selectedFile.type.startsWith, "video")) {
        console.log("video");
        formData.current.append("video", selectedFile);
      } else if (selectedFile.type.startsWith("image/")) {
        formData.append("code", selectedFile);
      } else if (selectedFile.type.startsWith("image/")) {
        formData.append("object", selectedFile);
      } else {
        console.log("not supported file type");
      }

      console.log(formData.current.get("image"));
      console.log(formData.current.get("video"));
    }
  };

  // Post data to backend. -  when click the button.
  const sendPostData = () => {
    console.log('FormData:', formData);
    console.log("pos");
    axios
      .post("http://localhost:5000/api/objectfile/upload", formData.current, {
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
          <div className="previewElement">
            <img
              src="./assets/card1.jpeg"
              className="imagePreview"
              alt=""
            ></img>
          </div>
          <p className="note">Attach your resource</p>

          <div className="objectPicker">
            <ImageButton
              title="Photo"
              backgroundColor="black"
              imageLink="./assets/Photo.svg"
              handleClick={() => handleButtonClick("image/*")}
            ></ImageButton>

            <ImageButton
              title="Video"
              backgroundColor="black"
              imageLink="./assets/Video.svg"
              handleClick={() => handleButtonClick("video/*")}
            ></ImageButton>

            <ImageButton
              title="Code"
              backgroundColor="black"
              imageLink="./assets/Code.svg"
              handleClick={() => handleButtonClick("text/plain")}
            ></ImageButton>

            <ImageButton
              title="Object"
              backgroundColor="black"
              imageLink="./assets/Object.svg"
              handleClick={() => handleButtonClick(".obj")}
            ></ImageButton>
            <InputMedia
              handleFileChange={handleFileChange}
              fileInputRef={fileInputRef}
              acceptedFileTypes={acceptedFileType}
            ></InputMedia>
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

export default PostWindow;
