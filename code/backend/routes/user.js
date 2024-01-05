/*const router = require("express").Router();
const User = require("../models/User");



// user registration
router.post("/user/register", async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    if( !username || !password || !email) return res.status(400).json("Username and Password required!");
    const newUser = new User ({
        username: username,
        password: password,
        email: email,
    })

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);

})


router.post("/user/login", async (req,res) => {
    const username = req.body.username;
    const userPassword = req.body.password;
    const foundUser = await User.findOne({username: username});
    if (!foundUser) return res.status(400).json("Wrong credentials");
    if (userPassword !== foundUser.password) return res.status(400).json("Wrong credentials!");
    const {password, ...others} = foundUser._doc;
    res.status(200).json(others);
})

module.exports = router*/

const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// user registration
router.post("/user/register", async (req, res) => {
  try {
    const { password, email } = req.body;
    if (!password || !email) return res.status(400).json("Password and Email are required!");

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      password: hashedPassword,
      email: email.trim(), // Trim email before saving
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    console.error("Error during user registration:", error);
    if (error.name === 'ValidationError') {
      res.status(400).json(error.message); // Handle Mongoose validation errors
    } else {
      res.status(500).json("Internal server error");
    }
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Provided email:", email);
    console.log("Provided password:", password);

    // Case-insensitive search for email
    const foundUser = await User.findOne({ email: { $regex: new RegExp(email, "i") } });
    if (!foundUser) return res.status(400).json("Wrong credentials");

    console.log("Found user:", foundUser);

    // Compare the provided password with the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, foundUser.password);
    console.log("Password match:", passwordMatch);

    console.log("Stored hashed password:", foundUser.password);
    console.log("Provided password during login:", password);


    if (!passwordMatch) return res.status(400).json("Wrong credentials");

    // If passwords match, send back user details (excluding password)
    const { password: _, ...others } = foundUser._doc;
    res.status(200).json(others);
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).json("Internal server error");
  }

  console.log("Stored hashed password byte values:");
for (let i = 0; i < foundUser.password.length; i++) {
  console.log(foundUser.password.charCodeAt(i));
}

console.log("Provided password byte values:");
for (let i = 0; i < password.length; i++) {
  console.log(password.charCodeAt(i));
}

});

module.exports = router;
