// routes/ObjectFile.js

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
function callPythonScript(filePath, email) {
  return new Promise((resolve, reject) => {
    const python = spawn("python3", ["./python/script2.py", filePath, email]);
    let output = "";

    python.on("close", (code) => {
      resolve(JSON.parse(output.trim()));
    });

    python.stdout.on("data", function (data) {
      output += data.toString();
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

    console.log("email", email);

    const idForFile = email.replace(/[^a-zA-Z]/g, "");
    console.log(idForFile);
    console.log(req.file.originalname);

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    if (req.file.originalname.endsWith(".hex")) {
      // Save to database

      console.log(" hex file");
      const objectFile = new ObjectFile({
        email,
        fileContent: req.file.buffer,
      });
      const savedObjectFile = await objectFile.save();

      res.status(201).json("hex");
    } else {
      // Save file to public folder
      const filePath1 = path.join(
        __dirname,
        "..",
        "python",
        "input",
        idForFile + ".obj"
      );
      await fs.writeFile(filePath1, req.file.buffer);

      console.log(filePath1);

      // Call the Python script with the path of the file as an argument

      const pathForObj = "./python/input/" + idForFile + ".obj";
      let preview = await callPythonScript(pathForObj, idForFile);

      const fileName = idForFile + ".hex";
      const filePath = path.join(__dirname, "..", fileName); // Specify your folder name
      // Specify your file name
      // console.log(filePath);

      // Read the content of the file from the specified folder
      const fileContent = await fs.readFile(filePath);

      // Save to database
      const objectFile = new ObjectFile({ email, fileContent: fileContent });
      const savedObjectFile = await objectFile.save();
      res.status(201).json(preview);
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
