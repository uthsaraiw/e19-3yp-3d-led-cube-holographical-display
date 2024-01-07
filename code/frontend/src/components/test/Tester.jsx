import React, { useRef } from "react";

export default function Tester() {
  const fileInputRef = useRef(null); // Ref to access the file input

  const handleAPI = async () => {
    const username = "your_username_here"; // Replace with the actual username value
    const email = "this is my try!"; // Replace with the actual email value if dynamically set

    // Create a new FileReader instance
    const reader = new FileReader();

    // Set up the onload event handler to handle the file reading
    reader.onload = async () => {
      try {
        const fileContent = reader.result; // Get the file content
        const payload = {
          username,
          email,
          textContent: fileContent, // Add the text content of the file to the payload
        };

        // Make POST request to backend
        const response = await fetch(
          "https://pc3t8g1v9l.execute-api.eu-north-1.amazonaws.com/test2/getObj",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Set the content type to JSON
            },
            body: JSON.stringify(payload), // Convert the JavaScript object to a JSON string
          }
        );

        const data = await response.json();
        console.log("Server Response:", data);
      } catch (error) {
        console.error("Error uploading text file:", error);
      }
    };

    // Read the selected text file as a binary string
    const selectedFile = fileInputRef.current.files[0];
    if (selectedFile) {
      reader.readAsBinaryString(selectedFile);
    }
  };

  return (
    <div>
      {/* Input element to select a text file */}
      <input
        type="file"
        ref={fileInputRef}
        accept=".txt" // Accepts only text files
      />

      {/* Button to trigger the API call */}
      <button onClick={handleAPI}>Submit</button>
    </div>
  );
}
