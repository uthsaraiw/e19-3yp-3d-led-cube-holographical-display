import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";

import "./rightbarPost.css";
import AppButton from "../AppButton/AppButton";
import ImageButton from "../ImageButton/ImageButton";
import InputMedia from "../InputMedia/InputMedia";

function RightbarPost(props) {
  // for navigation
  const navigate = useNavigate();

  const [userPostsCaption, setUserPostsCaption] = useState(""); // User's post caption.
  const [fileToSend, setFileToSend] = useState(null); // file to sen
  const [acceptedFileType, setAcceptedFileType] = useState("image/*");

  // input media files - this is to trigger the file input click event.
  const fileInputRef = useRef(null);

  // go to post window.
  const goToPostWindow = () => {
    localStorage.setItem("userPostsCaption", userPostsCaption);

    if (userPostsCaption !== "") {
      navigate("/post");
    } else {
      alert("Please enter a caption");
    }
  };

  // To handle file input. This function will be triggered when a file is selected.
  const handleFileChange = (event) => {
    const selectedFile = fileInputRef.current.files[0];

    if (selectedFile) {
      // Perform operations with the selected file (e.g., upload, display preview, etc.)
      setFileToSend(selectedFile);
      localStorage.setItem("fileToSendSingle", selectedFile);

      navigate("/post_window_one", { state: { selectedFile } });
    }
  };

  // Function to trigger file input click.
  const handleButtonClick = async (fileType) => {
    await setAcceptedFileType(fileType);
    console.log(fileType);
    if (fileInputRef.current) {
      fileInputRef.current.click(); // when button clicks, this one is called. and the input one also clicked.
    }
  };

  return (
    <div className="mainContainerRight">
      <div className="writeSomethingDev">
        <textarea
          className="writeSomethingTextArea"
          placeholder="Say hi to cubers..."
          onChange={(e) => setUserPostsCaption(e.target.value)}
        ></textarea>
        <AppButton
          title="Post"
          width="200px"
          onClickFunction={goToPostWindow}
        />
      </div>

      <div className="buttonsContainer">
        <ImageButton
          title="Photo"
          className="imageBtn"
          imageLink="./assets/Photo.svg"
          handleClick={() => handleButtonClick("image/*")}
        ></ImageButton>
        <ImageButton
          title="Video"
          className="imageBtn"
          imageLink="./assets/Video.svg"
          handleClick={() => handleButtonClick("video/*")}
        ></ImageButton>
        <ImageButton
          title="Code"
          className="imageBtn"
          imageLink="./assets/Code.svg"
          handleClick={() => handleButtonClick("text/plain")}
        ></ImageButton>
        <ImageButton
          title="Object"
          className="imageBtn"
          imageLink="./assets/Object.svg"
          handleClick={() => handleButtonClick(".obj")}
        ></ImageButton>

        <InputMedia
          handleFileChange={handleFileChange}
          fileInputRef={fileInputRef}
          acceptedFileTypes={acceptedFileType}
        ></InputMedia>
      </div>
    </div>
  );
}

export default RightbarPost;
