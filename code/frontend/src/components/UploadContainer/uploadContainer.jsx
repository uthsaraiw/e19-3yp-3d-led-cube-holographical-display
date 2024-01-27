import React, { useRef } from "react";
import { useState, useContext } from "react";
import axios from "axios";

import InputMedia from "../InputMedia/InputMedia";
import AppButton from "../AppButton/AppButton";
import { MyContext } from "../Contexts/MyContext";
import "./uploadContainer.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UploadContainer() {
  const uploadRef = useRef(null); // Ref to access the file input

  var Plotly = require("plotly.js-dist");

  const [acceptedFileType, setAcceptedFileType] = useState("");
  const [isPlotAvailable, setIsPlotAvailable] = useState(false);

  let formData = new FormData(); //  Create FormData to add post details.

  //const email = localStorage.getItem("myData");
  const email = "hello@gmail.com";

  const handleButtonClick = async (fileType) => {
    await setAcceptedFileType(fileType);
    console.log(fileType);
    if (uploadRef.current) {
      uploadRef.current.click(); // when button clicks this one is called, and the input one also clicked.
    }
  };

  // To handle file input. This function will be triggered when a file is selected.
  const handleFileChange = (event) => {
    const selectedFile = uploadRef.current.files[0];
    formData.append("email", email);

    if (selectedFile) {
      // Perform operations with the selected file (e.g., upload, display preview, etc.)
      formData.append("fileContent", selectedFile);
    }

    console.log("Form Data:", formData);

    sendPostData();

    formData = new FormData();
  };

  // Post data to backend.
  const sendPostData = () => {
    axios
      .post("http://localhost:5000/api/objectfile/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Update content type
        },
      })
      .then((res) => {
        console.log(res.data);

        localStorage.setItem("plotData", JSON.stringify(res.data));
        const savedData = JSON.parse(localStorage.getItem("plotData"));
        Plotly.newPlot("previewContainer", res.data.data, res.data.layout, {
          displayModeBar: false,
        });
        setIsPlotAvailable(true);
        toast("Ready to show!");
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };

  return (
    <div className="mainContainer">
      <ToastContainer theme="dark" position="bottom-right" />
      <div className="topContainer">
        <AppButton
          title="Upload Object"
          width="130px"
          onClickFunction={() => handleButtonClick(".obj")}
        ></AppButton>
        <AppButton
          title="Upload Code"
          width="130px"
          onClickFunction={() => handleButtonClick("text/plain")}
        ></AppButton>
      </div>
      <InputMedia
        acceptedFileTypes={acceptedFileType}
        handleFileChange={handleFileChange}
        fileInputRef={uploadRef}
      ></InputMedia>
      <div className="previewContainer2" id="previewContainer">
        {!isPlotAvailable && (
          <img src="../assets/card1.jpeg" className="image" alt="" />
        )}
      </div>
      <div className="bottomContainer">
        <AppButton title="Show In My Cube"></AppButton>
      </div>
    </div>
  );
}
