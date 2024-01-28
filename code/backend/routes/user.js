const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

const multer = require("multer");

// Set up multer for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// user registration
router.post("/user/register", async (req, res) => {
  try {
    console.log(req.body);
    const { password, email, username } = req.body;
    console.log(password, email, username);
    if (!password || !email || !username)
      return res.status(400).json("Password and Email are required!");

    const newUser = new User({
      password: password,
      email: email.trim(), // Trim email before saving
      userName: username,
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error during user registration:", error);
    if (error.name === "ValidationError") {
      res.status(400).json(error.message); // Handle Mongoose validation errors
    } else {
      res.status(500).json("Internal server error");
    }
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Case-insensitive search for email
    const foundUser = await User.findOne({
      email: { $regex: new RegExp(email.trim(), "i") },
    });
    if (!foundUser) return res.status(400).json("Wrong credentials");

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordMatch) return res.status(400).json("Wrong credentials");

    // If passwords match, send back user details (excluding password)
    const { password: _, ...others } = foundUser._doc;
    res.status(200).json(others);
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json("Internal server error");
  }
});

// Image upload endpoint using email
router.put("/user/upload-image", upload.single("image"), async (req, res) => {
  try {
    const userEmail = req.body.email; // Assuming email is sent in the request body

    console.log(req.body.email);

    if (!userEmail) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Assuming you're storing the image in the 'image' field of the User model

    if (req.file) {
      user.image = req.file.buffer.toString("base64"); // Convert buffer to base64 string
    }

    await user.save();

    res.status(200).json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PUT route to add a follower to a user
// router.put("/user/add-follower", async (req, res) => {
//   try {
//     const { userEmail, followerEmail } = req.body;

//     // Find the user to be followed
//     const userToFollow = await User.findOne({ email: userEmail });
//     if (!userToFollow) {
//       return res.status(404).json({ error: "User to follow not found" });
//     }

//     // Find the follower
//     const follower = await User.findOne({ email: followerEmail });
//     if (!follower) {
//       return res.status(404).json({ error: "Follower not found" });
//     }

//     // Check if the follower is not already following the user
//     const isAlreadyFollowing = userToFollow.followers.includes(followerEmail);

//     if (isAlreadyFollowing) {
//       return res.status(400).json({ error: "User is already being followed" });
//     }

//     // Update the user's followersCount and add the follower's email to the followers array
//     userToFollow.followersCount += 1;
//     userToFollow.followers.push(followerEmail);

//     // Save the updated user information
//     await userToFollow.save();

//     res.status(200).json({ message: "User followed successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

router.put("/user/add-follower", async (req, res) => {
  try {
    const { userEmail, followerEmail } = req.body;

    console.log(userEmail, followerEmail);

    // Find the user to be followed
    const userToFollow = await User.findOne({ email: userEmail });
    if (!userToFollow) {
      return res.status(404).json({ error: "User to follow not found" });
    }

    // Find the follower
    const follower = await User.findOne({ email: followerEmail });
    if (!follower) {
      return res.status(404).json({ error: "Follower not found" });
    }

    // Check if the follower is not already following the user
    const isAlreadyFollowing = userToFollow.followers.includes(followerEmail);

    // if (isAlreadyFollowing) {
    //   // If the follower is already following the user, remove them
    //   userToFollow.followers = userToFollow.followers.filter(
    //     (email) => email !== followerEmail
    //   );
    //   user.followersCount -= 1;
    // } else {
    //   // If the follower is not following the user, add them
    //   user.followers.push(followerEmail);
    //   user.followersCount += 1;
    // }

    // // Save the updated user information
    // await userToFollow.save();

    if (isAlreadyFollowing) {
      return res.status(400).json({ error: "User is already being followed" });
    }

    // Update the user's followersCount and add the follower's email to the followers array
    userToFollow.followersCount += 1;
    userToFollow.followers.push(followerEmail);

    // Update the follower's followingCount and add the followed user's email to the following array
    follower.followingCount += 1;
    follower.following.push(userEmail);

    // Save the updated user and follower information
    await userToFollow.save();
    await follower.save();

    res.status(200).json({ message: "User followed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
