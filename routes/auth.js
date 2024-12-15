const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// -------------------
// Signup Route
// -------------------
router.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  // Simple validation
  if (!username || !email || !password) {
    return res.status(400).send("Please enter all fields.");
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });
    if (existingUser) {
      return res
        .status(400)
        .send("User with this email or username already exists.");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Initialize session
    req.session.userId = newUser._id;

    // Redirect to homepage
    res.redirect("/");
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).send("Server error.");
  }
});

// -------------------
// Login Route (Optional for completeness)
// -------------------
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Simple validation
  if (!email || !password) {
    return res.status(400).send("Please enter all fields.");
  }

  try {
    // Check if user exists
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).send("Invalid credentials.");
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials.");
    }

    // Initialize session
    req.session.userId = user._id;

    // Redirect to homepage
    res.redirect("/");
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).send("Server error.");
  }
});

// -------------------
// Logout Route (Optional for completeness)
// -------------------
router.get("/logout", (req, res) => {
  if (req.session.userId) {
    req.session.destroy((err) => {
      if (err) {
        console.error("Logout error:", err);
        return res.status(500).send("Server error.");
      }
      res.clearCookie("connect.sid");
      res.redirect("/login.html");
    });
  } else {
    res.redirect("/login.html");
  }
});

module.exports = router;
