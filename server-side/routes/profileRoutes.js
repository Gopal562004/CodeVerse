const express = require("express");
const router = express.Router();
const User = require("../models/user"); // Import User schema
const auth = require("../middleware/auth"); // Use the new auth middleware

// Get user profile by ID (protected route)
router.get("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Update user profile (protected route)
router.put("/:id", auth, async (req, res) => {
  const { name, username, email, bio, profilePhoto } = req.body;

  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Update user fields
    user.name = name || user.name;
    user.username = username || user.username;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    user.profilePhoto = profilePhoto || user.profilePhoto;

    await user.save();

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
});
///Serach Profile
router.get("/search", async (req, res) => {
  const { query } = req.query; // Extract the query parameter
  console.log("Search query:", query);

  // Check if the query is provided
  if (!query || query.trim() === "") {
    return res.status(400).json({ message: "Query parameter is required" });
  }

  try {
    const users = await User.find({
      username: { $regex: query, $options: "i" },
    }); // Case insensitive search

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).json({ message: "Server error", error });
  }
});


//Delete Profile
router.delete("/:id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Check if the logged-in user is trying to delete their own profile
    if (user._id.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    await user.remove();

    res.json({ msg: "User profile deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
