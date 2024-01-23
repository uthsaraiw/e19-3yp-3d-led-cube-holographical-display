// routs/Postfile.js
const path = require("path");
const express = require('express');
const multer = require('multer');
const fs = require("fs").promises;
const validator = require("validator");
const PostFile = require("../models/postFile");
const { spawn } = require("child_process");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});
/*
// File upload route
router.post('/uploadfile', upload.single('fileContent'), async (req, res, next) => {
  console.log('Route Hit!');

  console.log('Request Body:', req.body);
  console.log('Request File:', req.file);
  
  
    const { email} = req.body;
    console.log('Email:', email);

    // Log the received file
    if (req.file) {
      console.log("Received File:", req.file);
    } else {
      console.log("No file received");
    }
    
  
    // Check if email is present
  if (!email || !validator.isEmail(email)) {
    return res.status(400).send('Invalid email address');
  }

  try {
    // Check if the file is present in the request
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    const postFile = new PostFile({
      email,
      fileContent: req.file.buffer,
    });

    await postFile.save();

    console.log('File saved successfully');

    res.status(201).send('File uploaded successfully');
  } catch (error) {
    console.error(error);
    next(error);
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
});

module.exports = router;*/

/*router.post('/uploadfile', upload.single('fileContent'), async (req, res, next) => {
  const { email, fileType } = req.body;

  // Check if email is present
  if (!email || !validator.isEmail(email)) {
    return res.status(400).send('Invalid email address');
  }

  try {
    // Check if the file is present in the request
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    // Determine and set the contentType based on the file type
    let contentType;
    if (req.file.mimetype.startsWith('image/')) {
      contentType = 'image/jpeg'; // Adjust based on the actual image type
    } else if (req.file.mimetype.startsWith('video/')) {
      contentType = 'video/mp4'; // Adjust based on the actual video type
    } else if (req.file.mimetype === 'text/plain') {
      contentType = 'text/plain';
    } else {
      contentType = 'application/octet-stream'; // Default for other file types
    }

    const postFile = new PostFile({
      email,
      contentType,
      fileContent: req.file.buffer,
    });

    await postFile.save();

    console.log('File saved successfully');

    res.status(201).send('File uploaded successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
});*/

router.post('/uploadfile', upload.single('fileContent'), async (req, res, next) => {
  const { email, fileType } = req.body;

  // Check if email is present
  if (!email || !validator.isEmail(email)) {
    return res.status(400).send('Invalid email address');
  }

  try {
    // Check if the file is present in the request
    if (!req.file) {
      return res.status(400).send('No file uploaded');
    }

    // Find an existing document based on email
    let postFile = await PostFile.findOne({ email });

    // If no document exists, create a new one
    if (!postFile) {
      postFile = new PostFile({ email, files: [] });
    }

    // Add the new file to the files array
    postFile.files.push({
      fileType,
      contentType: req.file.mimetype,
      fileContent: req.file.buffer,
    });

    // Save the updated or new document
    await postFile.save();

    console.log('File saved successfully');

    res.status(201).send('File uploaded successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
});


module.exports = router;
