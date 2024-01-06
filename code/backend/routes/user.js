const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

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

module.exports = router;
