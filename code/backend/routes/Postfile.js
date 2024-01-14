// routs/Postfile.js
const express = require('express');
const multer = require('multer');
const PostFile = require("../models/postFile");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 5,
  },
});

// File upload route
router.post('/uploadfile', upload.single('file'), async (req, res, next) => {
    const { email} = req.body;
    console.log('Email:', email);
    
  
    try {
      const postFile = new PostFile({
        email,
        //fileType,
        fileContent: req.file.buffer,
      });
  
      await postFile.save();
  
      res.status(201).send('File uploaded successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });

module.exports = router;