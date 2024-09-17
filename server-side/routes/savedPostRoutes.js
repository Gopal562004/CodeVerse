const express = require("express");
const router = express.Router();
const SavedPost = require("../models/savedPost");
const Post = require("../models/post");
const { jwtAuthMiddleware } = require("../jwt");

// Save a post
router.post("/posts/:postId/save", jwtAuthMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the post is already saved by the user
    const existingSave = await SavedPost.findOne({ postId, userId });
    if (existingSave) {
      return res.status(400).json({ message: "Post already saved" });
    }

    // Save the post
    const savedPost = new SavedPost({ postId, userId });
    await savedPost.save();

    res.status(201).json({ message: "Post saved successfully" });
  } catch (error) {
    console.error("Error saving post:", error);
    res.status(500).json({ error: error.message });
  }
});

// Unsave a post
router.post("/posts/:postId/unsave", jwtAuthMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    // Remove the saved post entry
    const result = await SavedPost.findOneAndDelete({ postId, userId });
    if (!result) {
      return res.status(404).json({ message: "Saved post not found" });
    }

    res.status(200).json({ message: "Post unsaved successfully" });
  } catch (error) {
    console.error("Error unsaving post:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get saved posts for a user
router.get(
  "/users/:userId/saved-posts",
  jwtAuthMiddleware,
  async (req, res) => {
    try {
      const { userId } = req.params;
      const userIdFromToken = req.user.id;

      if (userId !== userIdFromToken) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const savedPosts = await SavedPost.find({ userId }).populate("postId");
      res.json(savedPosts);
    } catch (error) {
      console.error("Error fetching saved posts:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
