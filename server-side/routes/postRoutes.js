const express = require("express");
const router = express.Router();
const multer = require("multer");
const Post = require("../models/post");
const { jwtAuthMiddleware } = require("../jwt");
const { uploadFileToFirebase } = require("../firebase/firebase"); // Client-side
const bucket = require("../firebase/firebaseAdmin"); // Server-side
require("dotenv").config();

// Configure Multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory before sending to Firebase
const upload = multer({ storage });

// Create Post Route
router.post(
  "/create-post",
  jwtAuthMiddleware,
  upload.array("files"),
  async (req, res) => {
    try {
      const {
        caption,
        description,
        projectURL,
        codeSnippets,
        location,
        tags,
        techStack,
      } = req.body;

      if (!caption || !description) {
        return res
          .status(400)
          .json({ error: "Caption and description are required" });
      }

      // Handle file uploads to Firebase
      const filePromises = (req.files || []).map((file) =>
        uploadFileToFirebase(file, req.user.id)
      );
      const fileResults = await Promise.all(filePromises);

      // Create the new post
      const newPost = new Post({
        caption,
        description,
        projectURL,
        codeSnippets,
        location,
        tags: Array.isArray(tags) ? tags : JSON.parse(tags || "[]"),
        techStack: Array.isArray(techStack)
          ? techStack
          : JSON.parse(techStack || "[]"),
        media: fileResults.map((file) => ({
          file_id: file.file_id,
          type: file.type,
        })),
        author: req.user.id,
      });

      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      console.error("Error creating post:", error);
      res.status(500).json({ error: error.message });
    }
  }
);

// Get all posts
router.get("/posts", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const posts = await Post.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalPosts = await Post.countDocuments();
    const nextPage = page * limit < totalPosts ? parseInt(page) + 1 : null;

    res.json({
      posts,
      nextPage,
    });
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Get a single post by ID
router.get("/posts/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId).populate("author"); // Populate the author field
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update a post
router.put("/posts/:id", jwtAuthMiddleware, async (req, res) => {
  try {
    const postId = req.params.id;
    const {
      caption,
      description,
      projectURL,
      codeSnippets,
      location,
      tags,
      techStack,
    } = req.body;

    const updatedPost = await Post.findById(postId);
    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (updatedPost.author.toString() !== req.user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    updatedPost.caption = caption || updatedPost.caption;
    updatedPost.description = description || updatedPost.description;
    updatedPost.projectURL = projectURL || updatedPost.projectURL;
    updatedPost.codeSnippets = codeSnippets || updatedPost.codeSnippets;
    updatedPost.location = location || updatedPost.location;
    updatedPost.tags = tags ? JSON.parse(tags) : updatedPost.tags;
    updatedPost.techStack = techStack
      ? JSON.parse(techStack)
      : updatedPost.techStack;

    await updatedPost.save();
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(400).json({ error: error.message });
  }
});

// Delete a post
router.delete("/posts/:id", jwtAuthMiddleware, async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    // Delete associated files from Firebase Storage
    post.media.forEach(async (file) => {
      const fileRef = bucket.file(file.file_id);
      try {
        await fileRef.delete();
        console.log(`Successfully deleted file: ${file.file_id}`);
      } catch (error) {
        console.error("Error deleting file from Firebase:", error);
      }
    });

    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
