const express = require("express");
const router = express.Router();
const {
  likePost,
  unlikePost,
  getLikes,
} = require("../controller/likepostController");
const { jwtAuthMiddleware } = require("../jwt");

// Like a post
router.post("/posts/:postId/like", jwtAuthMiddleware, likePost);

// Unlike a post
router.post("/posts/:postId/unlike", jwtAuthMiddleware, unlikePost);

// Get all likes for a post
router.get("/posts/:postId/likes", getLikes);

module.exports = router;
