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
    const { password, email } = req.body;
    if (!password || !email)
      return res.status(400).json("Password and Email are required!");

    const newUser = new User({
      password: password,
      email: email.trim(), // Trim email before saving
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

    if (!userEmail) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email: userEmail });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Assuming you're storing the image in the 'image' field of the User model
    user.image = req.file.buffer.toString("base64"); // Convert buffer to base64 string

    await user.save();

    res.status(200).json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
