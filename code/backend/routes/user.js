const router = require("express").Router();
const User = require("../models/User");



// user registration
router.post("/user/register", async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    if( !username || !password) return res.status(400).json("Username and Password required!");
    const newUser = await User.create
} )