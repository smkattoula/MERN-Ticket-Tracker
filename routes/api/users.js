const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

// Ticket Model
const User = require("../../models/User");

// Route: POST api/users
// Description: Register a new user
// Access: Public

router.post("/", async (req, res) => {
  try {
    let { email, password, passwordCheck, name } = req.body;
    const passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

    // validate

    if (!email || !password || !passwordCheck || !name)
      return res.status(400).json({ msg: "Not all fields have been entered" });
    if (password.length < 5)
      return res
        .status(400)
        .json({ msg: "The password needs to be at least 5 characters long" });
    if (password !== passwordCheck)
      return res
        .status(400)
        .json({ msg: "Enter the same password twice for verification" });

    if (!password.match(passw))
      return res.status(400).json({
        msg:
          "Password must contain at least one uppercase, one lowercase, and one numeric character",
      });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ msg: "An account with this email already exists" });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: passwordHash,
      name,
    });
    const savedUser = await newUser.save();
    res.json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
