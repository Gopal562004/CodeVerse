const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");
const { jwtAuthMiddleware } = require("../jwt");

// Create a comment
router.post("/posts/:postId/comments", jwtAuthMiddleware, async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ message: "Content is required" });
    }

    const comment = new Comment({
      content,
      postId,
      author: req.user.id,
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.error("Error creating comment:", error);
    res.status(500).json({ error: error.message });
  }
});

// Get comments for a post
router.get("/posts/:postId/comments", async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ postId }).populate("author");
    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: error.message });
  }
});

// Update a comment
router.put("/comments/:id", jwtAuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    comment.content = content || comment.content;
    await comment.save();
    res.status(200).json(comment);
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ error: error.message });
  }
});

// Delete a comment
router.delete("/comments/:id", jwtAuthMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findById(id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    if (comment.author.toString() !== req.user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    await Comment.findByIdAndDelete(id);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
