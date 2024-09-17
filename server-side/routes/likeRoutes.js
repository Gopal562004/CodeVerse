const express = require("express");
const router = express.Router();
const Like = require("../models/like");
const Post = require("../models/post");
const { jwtAuthMiddleware } = require("../jwt");

// Like a post
router.post("/posts/:postId/like", jwtAuthMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user has already liked the post
    const existingLike = await Like.findOne({ postId, userId });
    if (existingLike) {
      return res.status(400).json({ message: "Post already liked" });
    }

    const like = new Like({ postId, userId });
    await like.save();

    res.status(201).json({ message: "Post liked" });
  } catch (error) {
    console.error("Error liking post:", error);
    res.status(500).json({ error: error.message });
  }
});

// Unlike a post
router.post("/posts/:postId/unlike", jwtAuthMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const like = await Like.findOneAndDelete({ postId, userId });
    if (!like) {
      return res.status(404).json({ message: "Like not found" });
    }

    res.status(200).json({ message: "Post unliked" });
  } catch (error) {
    console.error("Error unliking post:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get all likes for a post
router.get("/posts/:postId/likes", async (req, res) => {
  try {
    const { postId } = req.params;
    const likes = await Like.find({ postId }).populate("userId");
    res.json(likes);
  } catch (error) {
    console.error("Error fetching likes:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
