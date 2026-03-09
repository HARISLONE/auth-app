const express = require("express"); // Import express
const jwt = require("jsonwebtoken"); // Import jsonwebtoken

const app = express(); // create express app
app.use(express.json()); // Middleware to parse JSON

const SECRET_KEY = "mysecretkey"; // Secret key for JWT
const TOKEN_EXPIRY = "1h"; // Token expiry time

let blacklist = new Set(); // In-memory blacklist for tokens

// Hardcoded credetials
const validCredentials = { admin: "admin123" }; // Valid username and password

// Login endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body; // get username and password from request body
  if (validCredentials[username] === password) {
    // check credentials
    const token = jwt.sign({ username }, SECRET_KEY, {
      expiresIn: TOKEN_EXPIRY,
    }); // create JWT
    res.status(200).json({ token }); // send token
  } else {
    res.status(401).json({ message: "Invalid credentials" }); // wrond credentials
  }
});

// Middleware to verify JWT
function authenticateToken(req, res, next) {
  // Get token from Authorization header
  const authHeader = req.headers["authorization"]; // Get header
  const token = authHeader && authHeader.split(" ")[1]; // Extract token
  if (!token) return res.status(401).json({ message: "Token missing" }); // No token
  if (blacklist.has(token))
    return res.status(401).json({ message: "Token invalidated" }); // Blacklisted token
  jwt.verify(token, SECRET_KEY, (err, user) => {
    // Verify token
    if (err)
      return res.status(401).json({ message: "Token expired or invalid" }); // Invalid/expired
    req.user = user; // Attach user to request
    next(); // Continues
  });
}

// Protected profile endpoint
app.get("/api/profile", authenticateToken, (req, res) => {
  // Return user info
  res.status(200).json({ username: req.user.username }); // Send username
});

// Logout endpoint
app.post("/api/logout", authenticateToken, (req, res) => {
  // Get token from Authorization header
  const authHeader = req.headers["authorization"]; // Get header
  const token = authHeader && authHeader.split(" ")[1]; // Extract token
  blacklist.add(token); // Add token to blacklist
  res.status(200).json({ message: "Logged out successfully" }); // Success
});

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000"); // Server started
});
