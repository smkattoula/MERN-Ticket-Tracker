const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

// Ticket Model
const User = require("../../models/User");

// Route: POST api/auth
// Description: Authenticate user
// Access: Public

router.post("/", (req, res) => {
  const { email, password } = req.body;

  // Validations
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // Check for an existing user
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    // Validate the password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }
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
            },
          });
        }
      );
    });
  });
});

// Route: POST api/auth/tokenIsValid
// Description: Validate the token
// Access: Public

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, config.get("JWT_SECRET"));
    if (!verified) return res.json(false);

    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: GET api/auth/user
// Description: Get user data
// Access: Private

router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = router;