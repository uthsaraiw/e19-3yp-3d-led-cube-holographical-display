import React, { useRef } from "react";
import { useState, useContext } from "react";
import axios from "axios";

import InputMedia from "../InputMedia/InputMedia";
import AppButton from "../AppButton/AppButton";
import { MyContext } from "../Contexts/MyContext";
import "./uploadContainer.css";

export default function UploadContainer() {
  const { data, setData } = useContext(MyContext);
  const uploadRef = useRef(null); // Ref to access the file input

  const [acceptedFileType, setAcceptedFileType] = useState("");

  let formData = new FormData(); //  Create FormData to add post details.

  const email = data; // get from login session. context api is used for this.

  const handleButtonClick = async (fileType) => {
    console.log(data);
    await setAcceptedFileType(fileType);
    console.log(fileType);
    if (uploadRef.current) {
      uploadRef.current.click(); // when button clicks this one is called, and the input one also clicked.
    }
  };

  // To handle file input. This function will be triggered when a file is selected.
  const handleFileChange = (event) => {
    console.log("pos0");
    console.log(email);

    const selectedFile = uploadRef.current.files[0];
    formData.append("email", email);
   

    if (selectedFile) {
      // Perform operations with the selected file (e.g., upload, display preview, etc.)
      formData.append("fileContent", selectedFile);
    }
    sendPostData();

    formData = new FormData();
  };

  // Post data to backend.
  const sendPostData = () => {
    console.log("pos");
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
  };

  return (
    <div className="mainContainer">
      <div className="topContainer">
        <AppButton
          title="Upload Object"
          width="150px"
          onClickFunction={() => handleButtonClick(".obj")}
        ></AppButton>
        <AppButton
          title="Upload Code"
          width="150px"
          onClickFunction={() => handleButtonClick("text/plain")}
        ></AppButton>
      </div>
      <InputMedia
        acceptedFileTypes={acceptedFileType}
        handleFileChange={handleFileChange}
        fileInputRef={uploadRef}
      ></InputMedia>
      <div className="previewContainer">
        <img src="../assets/card1.jpeg" className="image" alt=""></img>
      </div>
      <div className="bottomContainer">
        <AppButton title="Show In My Cube"></AppButton>
      </div>
    </div>
  );
}
