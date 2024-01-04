const router = require("express").Router();
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

module.exports = router