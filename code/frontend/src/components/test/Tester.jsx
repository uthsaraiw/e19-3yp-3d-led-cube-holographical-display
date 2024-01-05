import React, { useRef } from "react";
import axios from "axios";

export default function Tester() {
  const fileInputRef = useRef(null); // Ref to access the file input

  const handleAPI = () => {
    const email = "this is my try!"; // Replace with the actual email value if dynamically set
    console.log(email);

    // Create FormData and append email
    const formData = new FormData();
    formData.append("email", email); // Append email to formData

    // Append the selected image file from the input element to the formData
    const selectedFile = fileInputRef.current.files[0];
    if (selectedFile) {
      formData.append("image", selectedFile); // Assuming the key for the image is "image"
    }

    // Make POST request to backend
    axios
      .post("http://localhost:3500/LEDposts", formData, {
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
    <div>
      {/* Input element to select an image file */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*" // Accepts only image files
      />

      {/* Button to trigger the API call */}
      <button onClick={handleAPI}>Submit</button>
    </div>
  );
}

// import React from "react";
// import axios from "axios";

// export default function Tester() {
//   const handleAPI = () => {
//     const email = "this is my try!"; // Replace with the actual email value if dynamically set
//     console.log(email);

//     // Create FormData and append email
//     const formData = new FormData();
//     formData.append("email", email); // Append email to formData

//     // Make POST request to backend
//     axios
//       .post("http://localhost:3500/LEDposts", formData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       })
//       .then((res) => {
//         console.log(res.data);
//       })
//       .catch((error) => {
//         console.error("Error sending data:", error);
//       });
//   };

//   return (
//     <div>
//       <button onClick={handleAPI}>Submit</button>
//     </div>
//   );
// }
