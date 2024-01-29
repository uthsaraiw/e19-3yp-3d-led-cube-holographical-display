import React, { useRef } from "react";
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import InputMedia from "../InputMedia/InputMedia";
import AppButton from "../AppButton/AppButton";
import { MyContext } from "../Contexts/MyContext";
import "./uploadContainer.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UploadContainer() {
  const navigate = useNavigate();

  const uploadRef = useRef(null); // Ref to access the file input

  var Plotly = require("plotly.js-dist"); //  to show the preview.

  const [acceptedFileType, setAcceptedFileType] = useState("");
  const [isPlotAvailable, setIsPlotAvailable] = useState(false);

  let formData = new FormData(); //  Create FormData to add post details.

  const email = localStorage.getItem("email");
  // const email = "hello@gmail.com";

  // Once preview generated, you can go to the home page.

  const gotoHome = () => {
    navigate("/home_feed");
  };

  const handleButtonClick = async (fileType) => {
    await setAcceptedFileType(fileType);
    // console.log(fileType);
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

    sendPostData();

    formData = new FormData();
  };

  // Post data to backend.
  const sendPostData = () => {
    axios
      .post("http://16.171.4.112:5000/api/objectfile/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Update content type
        },
      })
      .then((res) => {
        console.log(res.data);

        if (res.data !== "hex") {
          localStorage.setItem("plotData", JSON.stringify(res.data));
          const savedData = JSON.parse(localStorage.getItem("plotData"));
          Plotly.newPlot("previewContainer", res.data.data, res.data.layout, {
            displayModeBar: false,
          });
          setIsPlotAvailable(true);
          toast("Ready to show!");
        }
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
          onClickFunction={() => handleButtonClick(".hex")}
        ></AppButton>
      </div>
      <InputMedia
        acceptedFileTypes={acceptedFileType}
        handleFileChange={handleFileChange}
        fileInputRef={uploadRef}
      ></InputMedia>
      <div className="previewContainer2" id="previewContainer">
        {!isPlotAvailable && (
          // <img src="./assets/scan.png" className="image" alt="" />

          <img
            src="./assets/scan.png"
            className="image"
            alt=""
            onClick={() =>
              (window.location.href =
                "http://led-frontend.s3-website.eu-north-1.amazonaws.com/")
            }
          />
        )}
      </div>
      <div className="bottomContainer">
        <AppButton
          title="Show In My Cube"
          onClickFunction={gotoHome}
        ></AppButton>
      </div>
    </div>
  );
}
