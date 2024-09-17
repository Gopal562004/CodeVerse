const express = require("express");
const router = express.Router();
const Follow = require("../models/follow");
const { jwtAuthMiddleware } = require("../jwt");

// Follow a user
router.post("/users/:userId/follow", jwtAuthMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const followerId = req.user.id;

    if (followerId === userId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const existingFollow = await Follow.findOne({ userId, followerId });
    if (existingFollow) {
      return res.status(400).json({ message: "Already following this user" });
    }

    const follow = new Follow({ userId, followerId });
    await follow.save();

    res.status(201).json({ message: "User followed" });
  } catch (error) {
    console.error("Error following user:", error);
    res.status(500).json({ error: error.message });
  }
});

// Unfollow a user
router.post("/users/:userId/unfollow", jwtAuthMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const followerId = req.user.id;

    const follow = await Follow.findOneAndDelete({ userId, followerId });
    if (!follow) {
      return res.status(404).json({ message: "Follow relationship not found" });
    }

    res.status(200).json({ message: "User unfollowed" });
  } catch (error) {
    console.error("Error unfollowing user:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get followers of a user
router.get("/users/:userId/followers", async (req, res) => {
  try {
    const { userId } = req.params;
    const followers = await Follow.find({ userId }).populate("followerId");
    res.json(followers);
  } catch (error) {
    console.error("Error fetching followers:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get users a user is following
router.get("/users/:userId/following", async (req, res) => {
  try {
    const { userId } = req.params;
    const following = await Follow.find({ followerId: userId }).populate(
      "userId"
    );
    res.json(following);
  } catch (error) {
    console.error("Error fetching following:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
