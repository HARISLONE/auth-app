const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const SECRET_KEY = "mysecretkey";
const TOKEN_EXPIRY = "1h";

let blacklist = new Set();

// Hardcoded credentials
const validCredentials = {
  admin: "admin123",
};

// LOGIN
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (validCredentials[username] === password) {
    const loginTime = new Date();

    const token = jwt.sign({ username, loginTime }, SECRET_KEY, {
      expiresIn: TOKEN_EXPIRY,
    });

    return res.status(200).json({ token });
  } else {
    return res.status(401).json({
      message: "Invalid credentials",
    });
  }
});

// JWT Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Token missing",
    });
  }

  if (blacklist.has(token)) {
    return res.status(401).json({
      message: "Token invalidated",
    });
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(401).json({
        message: "Token expired or invalid",
      });
    }

    req.user = user;
    next();
  });
}

// PROFILE
app.get("/api/profile", authenticateToken, (req, res) => {
  res.status(200).json({
    username: req.user.username,
    loginTime: req.user.loginTime,
  });
});

// LOGOUT
app.post("/api/logout", authenticateToken, (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token) {
    blacklist.add(token);
  }

  res.status(200).json({
    message: "Logged out successfully",
  });
});

// SERVER
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
