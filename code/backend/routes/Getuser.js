const express = require("express");
const User = require("../models/User");
const { cookieStorageManager } = require("@chakra-ui/react");

const router = express.Router();

// GET route to retrieve user data by email (excluding password)
router.get("/user-data", async (req, res) => {
  try {
    const userEmail = req.query.email;
    console.log(userEmail);

    // Find the user by email and exclude the password field
    const user = await User.findOne({ email: userEmail }).select("-password");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
