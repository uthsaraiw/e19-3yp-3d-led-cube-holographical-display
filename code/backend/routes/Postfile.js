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

// File upload route
router.post('/uploadfile', upload.single('fileContent'), async (req, res, next) => {
    const { email} = req.body;
    console.log('Email:', email);
    
  
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
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
});

module.exports = router;