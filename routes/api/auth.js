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

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered" });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, config.get("JWT_SECRET"));
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: POST api/auth/tokenIsValid
// Description: Validate the token
// Access: Public

router.post("/tokenIsValid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const decoded = jwt.verify(token, config.get("JWT_SECRET"));
    if (!decoded) return res.json(false);

    const user = await User.findById(decoded.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route: GET api/auth/user
// Description: Get user data
// Access: Private

router.get("/user", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({
    name: user.name,
    id: user._id,
  });
});

module.exports = router;
