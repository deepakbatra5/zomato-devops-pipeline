const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

const JWT_SECRET = process.env.JWT_SECRET || "dev_secret";

// helper to create token + response
function sendAuthResponse(user, res, statusCode = 200, message = null) {
  const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "7d" });
  return res.status(statusCode).json({
    message: message || "OK",
    token,
    user: { id: user.id, name: user.name, email: user.email },
  });
}

// POST /api/auth/signup  (and /register alias below)
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email & password required" });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: "Email used" });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      passwordHash,
    });

    return sendAuthResponse(user, res, 201, "Signup successful");
  } catch (e) {
    console.error("Signup error:", e);
    return res.status(500).json({ error: "Signup failed" });
  }
});

// Optional: support /api/auth/register as well
router.post("/register", async (req, res) => {
  return router.handle(req, res); // reuse /signup handler
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const u = await User.findOne({ where: { email } });
    if (!u) {
      return res.status(400).json({ error: "Invalid creds" });
    }

    const ok = await bcrypt.compare(password, u.passwordHash);
    if (!ok) {
      return res.status(400).json({ error: "Invalid creds" });
    }

    return sendAuthResponse(u, res, 200, "Login successful");
  } catch (e) {
    console.error("Login error:", e);
    return res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;

