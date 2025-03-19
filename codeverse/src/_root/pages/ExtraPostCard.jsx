import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaComment, FaBookmark } from "react-icons/fa";
import { FiHeart, FiSave } from "react-icons/fi";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} from "../../lib/MongoDB/commet";
const defaultProfilePhoto =
  "http://localhost:5000/uploads/default-profile-photo.jpg";

const ExtraPostCard = ({ post }) => {
  const navigate = useNavigate();
  const { user } = useAuth() ||{};
  const [isExpanded, setIsExpanded] = useState(false);
  const [author, setAuthor] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [saved, setSaved] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [error, setError] = useState("");

  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const [userId,setUserId] = useState("");
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser); // Parse the stored object
        if (parsedUser?._id) {
          setUserId(parsedUser._id); // Store the user ID in state
          console.log("User ID:", parsedUser._id);
        }
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
      }
    }
  }, []);
  useEffect(() => {
    const fetchAuthor = async () => {
      if (post.author) {
        try {
          const response = await axios.get(`${BASE_URL}/user/${post.author}`);
          setAuthor(response.data);
          console.log(user);
        } catch (error) {
          setError("Error fetching user data.");
        }
      }
    };
    fetchAuthor();
  }, [post.author]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/posts/${post._id}/likes`);
        setLikeCount(response.data.likeCount);
      } catch (error) {
        setError("Error fetching likes.");
      }
    };
    fetchLikes();
  }, [post._id]);

  const handleLikeToggle = async () => {
    if (!token) return alert("You need to log in to like posts.");
    try {
      const url = `${BASE_URL}/posts/${post._id}/${liked ? "unlike" : "like"}`;
      await axios.post(
        url,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setLiked(!liked);
      setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
    } catch (error) {
      setError(liked ? "Error unliking post." : "Error liking post.");
    }
  };

  const handleSaveToggle = async () => {
    if (!token) return alert("You need to log in to save posts.");
    try {
      await axios.post(
        `${BASE_URL}/posts/${post._id}/save`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSaved(!saved);
    } catch (error) {
      setError("Error saving post.");
    }
  };

  const toggleComments = async () => {
    setShowComments(!showComments);
    if (!showComments) {
      setLoadingComments(true);
      try {
        const response = await getComments(post._id);
        setComments(response || []);
        console.log(response);
      } catch (error) {
        setError("Error fetching comments.");
      } finally {
        setLoadingComments(false);
      }
    }
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (newComment.trim()) {
      try {
        const response = await createComment(post._id, newComment);
        setComments((prevComments) => [...prevComments, response.comment]);
        setNewComment("");
      } catch (error) {
        setError("Error adding comment.");
      }
    }
  };
  const handleCommentEdit = async (event) => {};
  // Handle comment deletion
 const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("Error deleting comment");
    }
  };
  return (
    <div className="flex max-w-4xl w-full bg-black border border-gray-800 rounded-lg overflow-hidden shadow-lg">
      {/* Left Side - Post Content */}
      <div className="flex-grow">
        {/* User Info */}
        <div
          className="flex items-center p-4 border-b border-gray-700 cursor-pointer"
          onClick={() => navigate(`/opponent-profile?userId=${post.author._id}`)}
        >
          <img
            className="w-10 h-10 rounded-full"
            src={post.author?.profilePhoto || defaultProfilePhoto}
            alt="Profile"
          />
          <p className="ml-3 font-semibold text-lg">
            {post.author?.username || "Username"}
          </p>
        </div>

        {/* Post Media */}
        <Carousel showArrows={true} infiniteLoop={true} showThumbs={false}>
          {post.media.map((mediaItem, index) => (
            <div key={index}>
              {mediaItem.type.startsWith("image") ? (
                <img
                  className="w-full max-h-96 object-cover"
                  src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${post.author._id}%2F${mediaItem.file_id}?alt=media`}
                  alt={post.caption}
                />
              ) : (
                <video
                  className="w-full max-h-96 object-cover"
                  controls
                  src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${post.author}%2F${mediaItem.file_id}?alt=media`}
                />
              )}
            </div>
          ))}
        </Carousel>

        {/* Caption */}
        <div className="p-4">
          <p className="font-bold text-lg">{post.caption}</p>
          <p className="text-gray-400">
            {isExpanded ? post.description : post.description.slice(0, 100)}{" "}
            {post.description.length > 100 && !isExpanded && "..."}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-500"
            >
              {" "}
              {isExpanded ? "Show Less" : "Read More"}{" "}
            </button>
          </p>
        </div>

        {/* Post Actions */}
        <div className="p-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <button
              className={`text-2xl ${liked ? "text-red-500" : "text-gray-500"}`}
              onClick={handleLikeToggle}
            >
              {liked ? <FaHeart /> : <FiHeart />}
            </button>
            <button className="text-2xl text-gray-500" onClick={toggleComments}>
              <FaComment />
            </button>
            <button
              className={`text-2xl ${
                saved ? "text-green-500" : "text-gray-500"
              }`}
              onClick={handleSaveToggle}
            >
              {saved ? <FiSave /> : <FaBookmark />}
            </button>
          </div>
          <span className="text-gray-400">{likeCount} Likes</span>
        </div>
      </div>

      {/* Comment Section - Fixed Width (Does NOT shrink the post) */}
      {showComments && (
        <div className="w-1/3 lg:w-full p-4 border-l border-gray-700 bg-black">
          <h3 className="text-lg font-semibold text-white">Comments</h3>
          <div className="max-h-96 overflow-y-auto space-y-3">
            {loadingComments ? (
              <p className="text-gray-500">Loading...</p>
            ) : comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment._id} className="p-3 bg-gray-900 rounded-lg">
                  <p className="text-gray-300 font-semibold">
                    <strong>{comment.author.name}</strong>{" "}
                  </p>
                  <p className="text-gray-400">
                    {comment.content}
                    <div
                      className="text-sm text-red cursor-pointer"
                      onClick={() => handleDeleteComment(comment._id)}
                    >
                      {comment.author._id == userId ? "delete" : ""}
                    </div>
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
          <form onSubmit={handleCommentSubmit} className="mt-4 flex">
            <input
              type="text"
              className="flex-grow bg-gray-900 text-white p-2 rounded-l"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 p-2 rounded-r hover:bg-blue-600"
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ExtraPostCard;
