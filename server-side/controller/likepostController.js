const Like = require("../models/like");
const Post = require("../models/post");

exports.likePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id; // Use req.user.id based on your JWT structure

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Check if the user has already liked the post
    const existingLike = await Like.findOne({ post: postId, user: userId });
    if (existingLike) {
      return res.status(400).json({ message: "You already liked this post" });
    }

    // If the user hasn't liked the post yet, create a new like
    const like = new Like({ post: postId, user: userId });
    await like.save();

    res.status(200).json({ message: "Post liked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error liking the post", error });
  }
};


exports.unlikePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.id; // Adjust according to your JWT payload

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Check if the user has liked the post before
    const like = await Like.findOneAndDelete({ post: postId, user: userId });
    if (!like) {
      return res.status(400).json({ message: "You haven't liked this post" });
    }

    res.status(200).json({ message: "Post unliked successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error unliking the post", error });
  }
};


exports.getLikes = async (req, res) => {
  try {
    const postId = req.params.postId;

    // Check if the post exists
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Fetch all likes for the post with user details
    const likes = await Like.find({ post: postId }).populate('user', 'username email');  // Customize fields as necessary
    const likeCount = likes.length;  // Count the number of likes

    res.status(200).json({ 
      likeCount,    // Return the total number of likes
      likes         // Return the list of likes with user details
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching likes", error });
  }
};
