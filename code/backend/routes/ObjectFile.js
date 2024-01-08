const path = require("path");
const multer = require("multer");
const fs = require("fs").promises; // Import the 'fs' module for file system operations
const express = require("express");
const validator = require("validator");
const ObjectFile = require("../models/objectFile");
const { spawn } = require("child_process");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5,
  },
});

const router = express.Router();

// Function to call Python script
function callPythonScript(filePath) {
  return new Promise((resolve, reject) => {
    const python = spawn("python", ["./python/script2.py", filePath]);

    python.on("close", (code) => {
      resolve();
    });

    python.stderr.on("data", (data) => {
      reject(data.toString());
    });
  });
}

router.post("/upload", upload.single("fileContent"), async (req, res, next) => {
  console.log("Received request:", req.body, req.file);

  try {
    const { email } = req.body;

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    // Save file to public folder
    const filePath1 = path.join(
      __dirname,
      "..",
      "python",
      "input",
      req.file.originalname
    );
    await fs.writeFile(filePath1, req.file.buffer);

    console.log(filePath1);

    // Call the Python script with the path of the file as an argument
    await callPythonScript("./python/input/newobj.obj");

    const fileName = "common_matrix.hex";
    const filePath = path.join(__dirname, "..", fileName); // Specify your folder name
    // Specify your file name
    console.log(filePath);

    // Read the content of the file from the specified folder
    const fileContent = await fs.readFile(filePath);

    console.log("File content:", fileContent);

    // Save to database
    const objectFile = new ObjectFile({ email, fileContent: fileContent });
    const savedObjectFile = await objectFile.save();

    res.status(201).json({ message: "File uploaded and saved successfully" });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
