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

// Get my posts (added route)
router.get("/my-posts", jwtAuthMiddleware, async (req, res) => {
  const userId = req.user.id; 
  const { page = 1, limit = 10 } = req.query; // Pagination params (default: page 1, 10 posts per page)

  try {
    const posts = await Post.find({ author: userId })
      .populate("author", "username imageUrl") // Include only necessary fields
      .sort({ createdAt: -1 }) // Sort by latest posts
      .skip((page - 1) * limit) // Skip based on pagination
      .limit(Number(limit)); // Limit results per page

    if (!posts.length) {
      return res.status(404).json({ message: "No posts found for this user." });
    }

    res.json(posts);
  } catch (error) {
    console.error("Error fetching my posts:", error);
    res.status(500).json({ error: "Server error" });
  }
});
// Get all posts
router.get("/posts", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const posts = await Post.find()
      .populate("author") // Populate only needed fields
      .skip((page - 1) * parseInt(limit))
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

// In your Express route file
router.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedPost = await Post.findByIdAndDelete(id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found." });
    }

    return res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    if (error instanceof mongoose.Error) {
      // Handle mongoose-specific errors
      return res.status(400).json({ message: "Bad request." });
    }
    console.error("Error deleting post:", error);
    return res.status(500).json({ message: "Server error." });
  }
});

//serach
// Search posts by hashtag in caption
// Search posts by hashtag in caption
// Search posts by exact caption match
// Search posts by caption without considering spaces
router.get("/search-post", async (req, res) => {
  try {
    const { searchTerm } = req.query;

    if (!searchTerm) {
      return res.status(400).json({ error: "Search term is required" });
    }

    // Sanitize the search term and remove spaces
    const sanitizedSearchTerm = searchTerm.trim().replace(/\s+/g, '').toLowerCase();

    // Find posts and compare captions without spaces
    const posts = await Post.find().lean(); // Fetch all posts

    // Filter posts based on the normalized caption
    const matchedPosts = posts.filter(post => 
      post.caption.replace(/\s+/g, '').toLowerCase() === sanitizedSearchTerm
    );

    if (matchedPosts.length === 0) {
      return res.status(404).json({ message: "No posts found." });
    }

    res.json(matchedPosts);
  } catch (error) {
    console.error("Error searching posts:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all posts by a specific user
router.get("/user-posts/:userId", async (req, res) => {
  const { userId } = req.params;
  const { page = 1, limit = 10 } = req.query; // Pagination params (default: page 1, 10 posts per page)

  try {
    const posts = await Post.find({ author: userId })
      .populate("author", "username imageUrl") // Include only necessary fields
      .sort({ createdAt: -1 }) // Sort by latest posts
      .skip((page - 1) * limit) // Skip based on pagination
      .limit(Number(limit)); // Limit results per page

    if (!posts.length) {
      return res.status(404).json({ message: "No posts found for this user." });
    }

    res.json(posts);
  } catch (error) {
    console.error("Error fetching user posts:", error);
    res.status(500).json({ error: "Server error" });
  }
});

//expolore page post
router.get("/explore-posts", async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const posts = await Post.find()
      .populate("author") // Populate only needed fields
      .skip((page - 1) * parseInt(limit))
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



module.exports = router;
