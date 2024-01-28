import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";

import "./rightbarProfile.css";

import ImageButton from "../ImageButton/ImageButton";
import AppButton from "../AppButton/AppButton";
import InputMedia from "../InputMedia/InputMedia";
import colors from "../../styles/colors";

export default function RightbarProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { usernames } = useParams();

  // usernames ? console.log("In other's profile") : console.log("In my profile");

  const [userData, setUserData] = useState([]);
  const [userPostsCaption, setUserPostsCaption] = useState(""); // User's post caption.
  const [fileToSend, setFileToSend] = useState(null); // file to send.
  const [acceptedFileType, setAcceptedFileType] = useState("image/*");
  const [haveFollowed, setHaveFollowed] = useState(false); //  this is to check whether the user has followed the profile or not.

  let email = ""; //  my email or other's email -  for fetching
  let visitingEmail = ""; //  this is to be followed -  other's email

  //  let visitorEmail = "kavi@gmail.com"; //  this is the follower - my email
  const visitorEmail = localStorage.getItem("email");

  if (usernames) {
    //set email for fetching user's data.
    email = location.state ? location.state.email : "";

    //followed or not
    visitingEmail = location.state ? location.state.email : "";
  } else {
    //set email for fetching user's data.
    email = localStorage.getItem("email");
    // email = "kavi@gmail.com";
  }

  // console.log("email", email);
  // console.log("visitingEmail", visitingEmail);
  // console.log("visitorEmail", visitorEmail);

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
    // console.log(selectedFile);

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

    if (fileInputRef.current) {
      fileInputRef.current.click(); // when button clicks, this one is called. and the input one also clicked.
    }
  };

  // get user's data from backend.
  useEffect(() => {
    fetch(`http://localhost:5000/api/user-data?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        console.log(data.followers);
        if (data.followers.includes(visitorEmail)) {
          setHaveFollowed(true);
        } else {
          setHaveFollowed(false);
        }
      });
  }, [email]);

  // send follow increment
  // backend should check whether follower inside his list and then increment 1 if there were not.

  // const [visitingEmail_, setVisitorEmail_] = useState(visitingEmail); // this is the profile visited by the account owner.
  // email =  this is the account owner's email

  const sendFollowing = () => {
    setHaveFollowed(!haveFollowed);
    axios
      .put(`http://localhost:5000/api/user/add-follower`, {
        followerEmail: visitorEmail, //  this is the follower.  my account owner, above account owner
        userEmail: visitingEmail, //  this is who will be followed.  the account owner of the profile we visit.
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="mainContainerRight">
      <div className="profileContainer">
        <img
          src={
            userData.image
              ? `data:image/png;base64,${userData.image}`
              : "http://localhost:3000/assets/Profile.jpg"
          }
          className="profilePic"
        ></img>
        <h3 className="profileName">{userData.userName}</h3>
        <div className="followerContainer">
          <div className="followers">
            <p className="numberOfFollowers">{userData.followersCount}</p>
            <p>Followers</p>
          </div>
          <div className="followers">
            <p className="numberOfFollowers">{userData.followingCount}</p>
            <p>Following</p>
          </div>
        </div>
        {usernames ? (
          <AppButton
            title={haveFollowed ? "Unfollow" : "Follow"}
            styles={{
              marginTop: "30px",
              background: colors.Purple,
              borderRadius: "20px",
              textTransform: "none",
              width: "auto",
              ":hover": {
                background: colors.Purple,
              },
            }}
            onClickFunction={() => {
              sendFollowing();
            }}
          ></AppButton>
        ) : null}
      </div>

      {!usernames ? (
        <div>
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
          </div>

          <div className="buttonsContainer">
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
          </div>

          <InputMedia
            handleFileChange={handleFileChange}
            fileInputRef={fileInputRef}
            acceptedFileTypes={acceptedFileType}
          ></InputMedia>
        </div>
      ) : null}
    </div>
  );
}
