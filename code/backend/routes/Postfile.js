// routs/Postfile.js
const path = require("path");
const express = require('express');
const multer = require('multer');
const fs = require("fs").promises;
const validator = require("validator");
const PostFile = require("../models/postFile");
const { spawn } = require("child_process");
//const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

// router.post('/uploadfile', upload.any(), async (req, res, next) => {
//   const { email } = req.body;

//   // Check if email is present
//   if (!email || !validator.isEmail(email)) {
//     return res.status(400).send('Invalid email address');
//   }

//   try {
//     // Create a new post for each upload
//     const newPost = new PostFile({ email, files: [] });

//     // Iterate through the files and add them to the files array of the new post
//     req.files.forEach((file) => {
//       const fileType = determineFileType(file.originalname);
//       newPost.files.push({
//         fileType,
//         fileContent: file.buffer,
//       });
//     });

//     // Save the new post
//     await newPost.save();

//     console.log('New post saved successfully');

//     res.status(201).send('New post uploaded successfully');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(`Internal Server Error: ${error.message}`);
//   }
// });

// // Function to determine file type based on file extension
// function determineFileType(filename) {
//   // Implement your logic here, for example:
//   if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
//     return 'image';
//   } else if (filename.endsWith('.mp4')) {
//     return 'video';
//   } else if (filename.endsWith('.hex')) {
//     return 'code';
//   } else if (filename.endsWith('.obj')) {
//     return 'object';
//   } else {
//     return 'unknown';
//   }
// }

// module.exports = router;
//const router = require('express').Router();
//const PostFile = require('../models/postFile');
//const multer = require('multer');
//const upload = multer();

// router.post('/uploadfile', upload.any(), async (req, res, next) => {
//   const { email } = req.body;

//   // Check if email is present
//   if (!email || !validator.isEmail(email)) {
//     return res.status(400).send('Invalid email address');
//   }

//   try {
//     // Create a new post for each upload
//     let post = await PostFile.findOne({ email });

//     if (!post) {
//       post = new PostFile({ email });
//     }

//     // Iterate through the files and save them in the corresponding fields
//     req.files.forEach((file) => {
//       const fileType = determineFileType(file.originalname);
//       post[fileType] = file.buffer;
//     });

//     // Save the new or updated post
//     await post.save();

//     console.log('Post saved successfully');

//     res.status(201).send('Post uploaded successfully');
//   } catch (error) {
//     console.error(error);
//     res.status(500).send(`Internal Server Error: ${error.message}`);
//   }
// });

// // Function to determine file type based on file extension
// function determineFileType(filename) {
//   // Implement your logic here, for example:
//   if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
//     return 'image';
//   } else if (filename.endsWith('.mp4')) {
//     return 'video';
//   } else if (filename.endsWith('.hex')) {
//     return 'code';
//   } else if (filename.endsWith('.obj')) {
//     return 'object';
//   } else {
//     return 'unknown';
//   }
// }


const router = require('express').Router();


router.post('/uploadfile', upload.any(), async (req, res, next) => {
  const { email } = req.body;

  // Check if email is present
  if (!email || !validator.isEmail(email)) {
    return res.status(400).send('Invalid email address');
  }

  try {
    // Create a new post for each upload
    const post = new PostFile({ email });

    // Iterate through the files and save them in the corresponding fields
    req.files.forEach((file) => {
      const fileType = determineFileType(file.originalname);
      post[fileType] = file.buffer;
    });

    // Save the new post
    await post.save();

    console.log('Post saved successfully');

    res.status(201).send('Post uploaded successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
});

// Function to determine file type based on file extension
function determineFileType(filename) {
  // Implement your logic here, for example:
  if (filename.endsWith('.jpg') || filename.endsWith('.jpeg')) {
    return 'image';
  } else if (filename.endsWith('.mp4')) {
    return 'video';
  } else if (filename.endsWith('.hex')) {
    return 'code';
  } else if (filename.endsWith('.obj')) {
    return 'object';
  } else {
    return 'unknown';
  }
}

module.exports = router;
