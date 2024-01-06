//routes/ObjectFile.js
const express = require('express');
const multer = require('multer');
const ObjectFile = require('../models/objectFile');

const router = express.Router();
const storage = multer.memoryStorage(); // Use memory storage for testing, change as needed
const upload = multer({ storage: storage });

router.use(upload.single('file'));

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const { email } = req.body; // Assume email is provided in the request body
    const { originalname, buffer } = req.file;

    const newObjectFile = new ObjectFile({
      email,
      filename: originalname,
      fileContent: buffer,
    });

    await newObjectFile.save();
    res.status(201).json({ message: 'File uploaded successfully' });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = (upload) => router;

