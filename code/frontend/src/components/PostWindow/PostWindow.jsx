import React from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";

import "./postWindow.css";

import ImageButton from "../ImageButton/ImageButton";
import AppButton from "../AppButton/AppButton";
import InputMedia from "../InputMedia/InputMedia";

function PostWindow(props) {
  const navigate = useNavigate();

  const goToPostWindow = () => {
    navigate("/profile_feed");
  };

  // input media files - this in to trigger the file input click event.
  const fileInputRef = useRef(null);

  // Function to trigger file input click event
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // To handle file input. This function will be triggered when a file is selected.
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; // Get the first selected file

    if (selectedFile) {
      // Perform operations with the selected file (e.g., upload, display preview, etc.)
      console.log("Selected file:", selectedFile);

      // You can also read the file content or display a preview of the selected image if required
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        // Handle file reader onloadend event (e.g., display image preview)
        const imageUrl = fileReader.result;
        console.log("Image URL:", imageUrl);
        // Update component state or perform additional actions as needed
      };
      fileReader.readAsDataURL(selectedFile); // Read file content as Data URL (e.g., for image preview)
    }
  };

  return (
    <div className="PostMainComponent">
      <div className="postContainer">
        <h2 className="createPost">Create Post</h2>
        <div className="postPreview">
          <div className="previewElement">
            <img src="./assets/card1.jpeg" className="imagePreview"></img>
          </div>
          <p className="note">Attach your resource</p>

          <div className="objectPicker">
            <ImageButton
              title="Photo"
              backgroundColor="black"
              imageLink="./assets/Photo.svg"
              handleClick={handleButtonClick}
            ></ImageButton>
            <InputMedia
              handleFileChange={handleFileChange}
              fileInputRef={fileInputRef}
              acceptedFileTypes={"image/*"}
            ></InputMedia>
            <ImageButton
              title="Video"
              backgroundColor="black"
              imageLink="./assets/Video.svg"
              handleClick={handleButtonClick}
            ></ImageButton>
            <InputMedia
              handleFileChange={handleFileChange}
              fileInputRef={fileInputRef}
              acceptedFileTypes={"video/*"}
            ></InputMedia>
            <ImageButton
              title="Code"
              backgroundColor="black"
              imageLink="./assets/Code.svg"
              handleClick={handleButtonClick}
            ></ImageButton>
            <InputMedia
              handleFileChange={handleFileChange}
              fileInputRef={fileInputRef}
              acceptedFileTypes={"text/plain"}
            ></InputMedia>
            <ImageButton
              title="Object"
              backgroundColor="black"
              imageLink="./assets/Object.svg"
              handleClick={handleButtonClick}
            ></ImageButton>
            <InputMedia
              handleFileChange={handleFileChange}
              fileInputRef={fileInputRef}
              acceptedFileTypes={".obj"}
            ></InputMedia>
          </div>

          <AppButton
            title="Share to Cubers"
            className="shareBtn"
            onClickFunction={goToPostWindow}
          ></AppButton>
        </div>
      </div>
    </div>
  );
}

export default PostWindow;
