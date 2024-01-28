import React from "react";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from "axios";

import colors from "../../styles/colors";
import "./../PostWindow/postWindow.css";
import "./settings.css";
import { TextFieldStylesForSettings } from "./../LongStyles";

import AppButton from "../AppButton/AppButton";
import InputMedia from "../InputMedia/InputMedia";

import { TextField } from "@mui/material";

function PostWindow(props) {
  // for navigation
  const navigate = useNavigate();

  const email = localStorage.getItem("email");
  //const email = "kavi@gmail.com"; // get from login session
  console.log(email);

  const [previewElement, setPreviewElement] = useState(null);
  const [username, setUsername] = useState("");
  const [emailInput, setEmailInput] = useState("");

  // input media files - this in to trigger the file input click event.
  const fileInputRef = useRef(null);

  // Function to trigger file input click.
  const handleButtonClick = async (fileType) => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // when button clicks this one is called, and the input one also clicked.
    }
  };

  // To handle file input. This function will be triggered when a file is selected.
  const handleFileChange = (event) => {
    const selectedFile = fileInputRef.current.files[0];
    console.log(selectedFile);

    if (selectedFile) {
      setPreviewElement(URL.createObjectURL(selectedFile));
      console.log("file selected", selectedFile);
      // formData.append("image", selectedFile);
    }
  };

  // Post data to backend. -  when click the button. - update the profile info
  const sendPostData = () => {
    let formData = new FormData();

    console.log("gggg", email);

    formData.append("image", fileInputRef.current.files[0]);
    formData.set("email", email);

    axios
      .put(`http://localhost:5000/api/user/upload-image`, formData, {
        headers: {
          "Content-Type": "multipart",
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
        <h2 className="createPost">Settings</h2>
        <div className="postPreview">
          <div className="previewElementSettings">
            {previewElement ? (
              <img
                src={previewElement}
                className="imagePreviewSettings"
                alt=""
              />
            ) : (
              <img
                src="./assets/2.jpg"
                className="imagePreviewSettings"
                alt=""
              />
            )}

            <div className="objectPicker">
              <AppButton
                title="Pick Photo"
                onClickFunction={() => handleButtonClick("image/*")}
                styles={{
                  background: "black",
                  borderRadius: "20px",
                  textTransform: "none",
                  width: props.width || "auto",
                  ":hover": {
                    background: "black",
                  },
                }}
              ></AppButton>
              <InputMedia
                handleFileChange={handleFileChange}
                fileInputRef={fileInputRef}
                acceptedFileTypes={"image/*"}
              ></InputMedia>
            </div>
          </div>

          {/* <div className="otherData">
            <TextField
              fullWidth
              label="Username"
              id="fullWidth"
              margin="dense"
              sx={TextFieldStylesForSettings}
              InputLabelProps={{
                style: { color: colors.BlackLow2 },
              }}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              fullWidth
              label="Email"
              id="fullWidth"
              sx={TextFieldStylesForSettings}
              margin="normal"
              InputLabelProps={{
                style: { color: colors.BlackLow2 },
              }}
              onChange={(e) => setEmailInput(e.target.value)}
            />
          </div> */}

          <AppButton
            title="Update Profile"
            className="shareBtn"
            styles={{
              background: "linear-gradient(180deg, #9039FF 0%, #001FC0 100%)",
              borderRadius: "20px",
              textTransform: "none",
              width: props.width || "auto",
              marginTop: "20px",
            }}
            onClickFunction={sendPostData}
          ></AppButton>
        </div>
      </div>
    </div>
  );
}

export default PostWindow;
