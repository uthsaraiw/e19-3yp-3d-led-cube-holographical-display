const path = require("path");
const express = require("express");
const multer = require("multer");
const fs = require("fs").promises;
const validator = require("validator");
const PostFile = require("../models/postFile");

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    //fileSize: 1024 * 1024 * 100,
    fileSize: Infinity,
  },
});

const router = require("express").Router();

router.post("/uploadfile", upload.any(), async (req, res, next) => {
  const { email, caption } = req.body;

  // Check if email is present
  if (!email || !validator.isEmail(email)) {
    return res.status(400).send("Invalid email address");
  }

  try {
    // Create a new post for each upload
    const post = new PostFile({ email, caption});

    // Iterate through the files and save them in the corresponding fields
    req.files.forEach((file) => {
      const fileType = determineFileType(file.originalname);
      post[fileType] = file.buffer;
    });

    // Save the new post
    await post.save();

    console.log("Post saved successfully");

    res.status(201).send("Post uploaded successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send(`Internal Server Error: ${error.message}`);
  }
});




// Function to determine file type based on file extension
function determineFileType(filename) {
  // Implement your logic here, for example:
  if (
    filename.endsWith(".jpg") ||
    filename.endsWith(".jpeg") ||
    filename.endsWith(".png")
  ) {
    return "image";
  } else if (filename.endsWith(".mp4") || filename.endsWith(".mkv")) {
    return "video";
  } else if (filename.endsWith(".hex")) {
    return "code";
  } else if (filename.endsWith(".obj")) {
    return "object";
  } else {
    return "unknown";
  }
}

// Update the reactions count and add/remove user email from the array
router.put('/reactions', async (req, res) => {
  try {
    const { email, postId } = req.body;

    // Fetch the post by ID
    let post = await PostFile.findById(postId);

    if (!post) {
      return res.status(404).send('Post not found');
    }

    // If 'reactions' field doesn't exist or is not an array, initialize it as an array
    if (!post.reactions || !Array.isArray(post.reactions.users)) {
      post.reactions = { count: 0, users: [] };
    }

    // Check if the user's email is already in the array
    const userIndex = post.reactions.users.indexOf(email);

    if (userIndex === -1) {
      // User is not in the array, add the reaction
      post.reactions.count += 1; // Increment the reactions count by 1
      post.reactions.users.push(email); // Add the new reaction details
    } else {
      // User is in the array, remove the reaction
      post.reactions.count -= 1; // Decrement the reactions count by 1
      post.reactions.users.splice(userIndex, 1); // Remove the user's email
    }

    // Save the updated post
    await post.save();

    res.status(200).send('Like reaction updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

router.put('/comments', async (req, res) => {
  try {
    const { email, postId, comment } = req.body;


    // Fetch the post by ID and update the comments based on the provided information
    const post = await PostFile.findByIdAndUpdate(postId, {
      $inc: { commentsCount: 1 }, // Increment the comments count by 1
      $push: { comments: { email, comment } }, // Add the new comment as an object
    });

    if (!post) {
      return res.status(404).send('Post not found');
    }

    res.status(200).send('Comment added successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Function to create a comment string with the format "email: comment"
function createCommentString(email, comment) {
  return `${email}: ${comment}`;
}



module.exports = router;

