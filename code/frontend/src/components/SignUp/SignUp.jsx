import React, { useState } from "react";

import "./signUp.css";

import AppButton from "../AppButton/AppButton";
import AppInput from "../AppInput/AppInput";

import { useNavigate } from "react-router-dom";

function PostWindow(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = props.mainTitle === "Register";
  console.log(register);

  const navigate = useNavigate();

  const sendUserDataToAPI = async () => {
    try {
      // Define the API endpoint URL
      const apiUrl = register
        ? "http://localhost:3500/register"
        : "http://localhost:3500/auth";

      const userData = {
        username: email,
        password: password,
      };

      // Make an HTTP POST request to the API endpoint with the user data payload in the request body
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData), // Convert user data object to JSON string
      });

      // Parse the JSON response data
      const responseData = await response.json();

      // Handle the API response data (e.g., display success message, navigate to next page, etc.)
      if (response.ok) {
        // Handle successful API response (e.g., display success message, navigate to next page, etc.)
        register
          ? alert("User registration successful!")
          : alert("Login successful!");
        navigate("/home_feed"); // Navigate to home_feed route or desired route
      } else {
        // Handle API error response (e.g., display error message, handle error cases, etc.)
        register
          ? alert("User registration failed. Please try again.")
          : alert("Login failed");
      }
    } catch (error) {
      // Handle any errors that occurred during the API request (e.g., network error, server error, etc.)
      console.error("Error registering user:", error);
    }
  };

  const handleButtonClick = () => {
    sendUserDataToAPI();
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  return (
    <div className="PostMainComponent">
      <div className="formContainer">
        <h2 className="loginTitle">{props.mainTitle}</h2>
        <p className="email">Email</p>
        <AppInput handleInputChange={handleEmailChange}></AppInput>

        <p className="password">Password</p>
        <AppInput handleInputChange={handlePasswordChange}></AppInput>

        <AppButton
          title={props.buttonTitle}
          className="shareBtn"
          onClickFunction={handleButtonClick}
        ></AppButton>
      </div>
    </div>
  );
}

export default PostWindow;
