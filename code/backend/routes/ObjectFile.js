const fs = require("fs");
const path = require("path");
const multer = require("multer");
const express = require("express");
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

    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    // Save file to public folder
    const filePath = path.join(
      __dirname,
      "..",
      "upload",
      req.file.originalname
    );
    await fs.promises.writeFile(filePath, req.file.buffer);

    




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

// // routes/ObjectFile.js
// const express = require("express");
// const multer = require("multer");
// const ObjectFile = require("../models/objectFile");
// const validator = require("validator");

// const router = express.Router();
// const storage = multer.memoryStorage(); // Use memory storage for testing, change as needed
// const upload = multer({
//   storage: storage,
//   limits: {
//     fieldSize: 1024 * 1024 * 5, // Adjust as needed
//   },
// });

// router.post("/upload", upload.single("fileContent"), async (req, res, next) => {
//   console.log("Received request:", req.body, req.file);

//   try {
//     const { email } = req.body;

//     // Validate email
//     if (!validator.isEmail(email)) {
//       return res.status(400).json({ error: "Invalid email address" });
//     }

//     if (!req.file) {
//       return res.status(400).json({ error: "No file provided" });
//     }

//     const { buffer } = req.file;

//     if (!buffer || buffer.length === 0) {
//       return res.status(400).json({ error: "File content is required" });
//     }

//     // Create a new ObjectFile instance
//     const newObjectFile = new ObjectFile({
//       email,
//       //filename: originalname,
//       fileContent: buffer,
//     });

//     // Save the object file to MongoDB

//     const savedObjectFile = await newObjectFile.save();
//     console.log("Saved Object File:", savedObjectFile);

//     return res.status(201).json({ message: "File uploaded successfully" });
//   } catch (error) {
//     console.error(error);
//     next(error); // Pass the error to the next middleware
//   }
// });

// module.exports = router;
