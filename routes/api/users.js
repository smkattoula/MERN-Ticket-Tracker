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

router.post("/", (req, res) => {
  const { name, email, password, passwordCheck } = req.body;

  // Validations
  if ((!name || !email || !password, !passwordCheck)) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  if (password.length < 5) {
    return res
      .status(400)
      .json({ msg: "Password must be at least 5 characters long" });
  }

  if (password !== passwordCheck) {
    return res.status(400).json({ msg: "Passwords do not match" });
  }

  // Check for an existing user
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
    });

    // Create bcrypt salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            config.get("JWT_SECRET"),
            {
              expiresIn: 3600,
            },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                },
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
