import React, { useState, useContext, useEffect } from "react";

import "./signUp.css";

import AppButton from "../AppButton/AppButton";
import AppInput from "../AppInput/AppInput";
import { MyContext } from "../Contexts/MyContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

function PostWindow(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { data, setData } = useContext(MyContext);

  const register = props.mainTitle === "Register";
  console.log(register);

  const navigate = useNavigate();

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const sendUserDataToAPI = async () => {
    try {
      // Define the API endpoint URL
      const apiUrl = register
        ? "http://16.171.4.112:5000/api/user/register"
        : "http://16.171.4.112:5000/api/user/login";

      const userData = {
        email: email,
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
        localStorage.setItem("myData", data);
        register
          ? toast.success("User registration successful!")
          : toast.success("Login successful!");
        await sleep(1500); // Sleep for 2 seconds
        navigate("/home_feed");
      } else {
        register
          ? toast.error("User registration failed. Please try again.")
          : toast.error("Login failed. Please try again.");
      }
    } catch (error) {
      // Handle any errors that occurred during the API request (e.g., network error, server error, etc.)
      console.error("Error registering user:", error);
    }
  };

  useEffect(() => {
    setData(email);
  }, [email]);

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
      <ToastContainer theme="dark" />
      <div className="formContainer">
        <h2 className="loginTitle">{props.mainTitle}</h2>
        <p className="email">Email</p>
        <AppInput handleInputChange={handleEmailChange}></AppInput>

        <p className="password">Password</p>
        <AppInput
          type={"password"}
          handleInputChange={handlePasswordChange}
          minLength={8}
        ></AppInput>

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
