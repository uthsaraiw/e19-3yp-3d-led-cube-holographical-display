const fs = require("fs");
const path = require("path");
const multer = require("multer");
const fs = require('fs').promises;  // Import the 'fs' module for file system operations
const express = require("express");
const path = require('path');
const validator = require("validator");
const ObjectFile = require("../models/objectFile");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5,
  },
});

const router = express.Router();

router.post("/upload", upload.single("fileContent"), async (req, res, next) => {
  console.log("Received request:", req.body, req.file);

  try {
    const { email } = req.body;

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    const folderPath = path.join(__dirname, 'uploads'); // Specify your folder name
    const fileName = 'skl.obj'; // Specify your file name
    const filePath = path.join(folderPath, fileName);

    // Read the content of the file from the specified folder
    const fileContent = await fs.readFile(filePath);

    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    // Save file to public folder
    const filePath1 = path.join(
      __dirname,
      "..",
      "public",
      req.file.originalname
    );
    await fs.promises.writeFile(filePath1, req.file.buffer);

    // Save to database
    const objectFile = new ObjectFile({ email, fileContent: req.file.buffer });
    const savedObjectFile = await objectFile.save();

    res.status(201).json({ message: "File uploaded and saved successfully" });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
