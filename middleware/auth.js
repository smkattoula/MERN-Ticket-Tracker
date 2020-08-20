const config = require("config");
const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");

  // Check for token
  if (!token) {
    res.status(401).json({ msg: "Authorization denied" });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get("JWT_SECRET"));

    // Add user from payload
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ msg: "Invalid token" });
  }
}

module.exports = auth;
