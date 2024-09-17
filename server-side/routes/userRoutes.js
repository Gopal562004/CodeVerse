const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { generateToken } = require("../jwt");

// User registration
router.post("/sign-up", async (req, res) => {
  try {
    const { username, password, email, name } = req.body;

    if (!username || !password || !email || !name) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    }

    const user = new User({ username, password, email, name });

    // Save the user with hashed password
    await user.save();

    const token = generateToken({ id: user._id });
    res.status(201).json({ user, token });
  } catch (err) {
    console.error("Error during sign-up:", err);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// User login
router.post("/sign-in", async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res
        .status(400)
        .json({ message: "Identifier and password are required" });
    }

    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const token = generateToken({ id: user._id });
    res.json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// User sign-out (optional, for client-side implementation)
router.post("/sign-out", (req, res) => {
  res.status(200).json({ message: "User signed out successfully" });
});

// User profile update
router.put("/update-profile", async (req, res) => {
  try {
    const { userId, name, profilePhoto, bio } = req.body;

    // Validate inputs if necessary
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (profilePhoto) user.profilePhoto = profilePhoto;
    if (bio) user.bio = bio;

    await user.save();

    res.status(200).json({ user });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;
