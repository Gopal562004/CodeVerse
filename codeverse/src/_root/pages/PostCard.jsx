import React, { useState, useEffect } from "react";
import { FaHeart, FaComment, FaBookmark } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { motion } from "framer-motion"; // Import for animations

const defaultProfilePhoto =
  "http://localhost:5000/uploads/default-profile-photo.jpg"; // Replace with your default photo URL

const PostCard = ({ post }) => {
  const [isExpanded, setIsExpanded] = useState(true); // Initially show small preview
  const [author, setAuthor] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([
    { id: 1, username: "coder123", text: "Great post!" },
    { id: 2, username: "dev_guru", text: "Very informative, thanks!" },
  ]);

  useEffect(() => {
    const fetchAuthor = async () => {
      if (post.author) {
        try {
          const response = await fetch(
            `http://localhost:5000/user/${post.author}`
          );
          const data = await response.json();
          setAuthor(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchAuthor();
  }, [post.author]);

  // Firebase Storage base URL
  const firebaseStorageBaseURL =
    "https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/";

  // Check if post.media is an array and has at least one media item
  const media = Array.isArray(post.media) ? post.media : [];

  // Filter media into images and videos
  const images = media.filter((item) => item.type === "image");
  const videos = media.filter((item) => item.type === "video");

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleSave = () => {
    setSaved(!saved);
  };

  const handleShowComments = () => {
    setShowComments(!showComments);
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim()) {
      setComments([
        ...comments,
        { id: comments.length + 1, username: "You", text: newComment },
      ]);
      setNewComment("");
    }
  };

  // Construct Firebase Storage URL
  const constructFirebaseURL = (fileId) => {
    const url = `${firebaseStorageBaseURL}${encodeURIComponent(
      `user_post_upload/${post.author}/${fileId}`
    )}?alt=media`;
    return url;
  };

  return (
    <div className="max-w-sm sm:max-w-md lg:max-w-lg rounded-lg overflow-hidden shadow-lg border border-gray-800 ">
      {/* User Info Header */}
      <div className="flex items-center p-4 border-b border-gray-200">
        <img
          className="w-10 h-10 rounded-full object-cover"
          src={
            author?.profilePhoto
              ? `http://localhost:5000/uploads/${author.profilePhoto}`
              : defaultProfilePhoto
          }
          alt={`${author?.username || "User"}'s profile`}
        />
        <div className="ml-3 flex-grow">
          <div className="flex items-center">
            <p className="font-semibold text-lg mr-2">
              {author?.username || "Username"}
            </p>
            <button className="bg-blue-500 text-white text-xs py-1 px-2 rounded">
              Follow
            </button>
          </div>
        </div>
      </div>

      {images.length > 0 || videos.length > 0 ? (
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          showThumbs={false} // Remove small image previews
          className="carousel-wrapper"
        >
          {images.map((image, index) => (
            <div key={index}>
              <img
                className={`w-full ${
                  isExpanded ? "max-h-96" : "max-h-48"
                } object-cover transition-all duration-500`} // Add transition
                src={constructFirebaseURL(image.file_id)}
                alt={post.caption}
              />
            </div>
          ))}
          {videos.map((video, index) => (
            <div key={index}>
              <video
                className={`w-full ${
                  isExpanded ? "max-h-96" : "max-h-48"
                } object-cover transition-all duration-500`} // Add transition
                src={constructFirebaseURL(video.file_id)}
                controls
                alt={post.caption}
              />
            </div>
          ))}
        </Carousel>
      ) : (
        <p className="text-center py-4">No media available</p>
      )}

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{post.caption}</div>
        <p
          className={`text-gray-700 text-base ${
            isExpanded ? "h-auto" : "h-24 overflow-hidden"
          } transition-all duration-300`} // Add transition
        >
          {post.description}
        </p>
        <button
          onClick={handleToggleExpand}
          className="text-blue-500 hover:underline mt-2"
        >
          {isExpanded ? "Read More" : "Show Less"}
        </button>
      </div>

      <div className="px-6 pt-4 pb-2 flex items-center justify-between">
        <div className="flex space-x-8">
          {" "}
          {/* Increased spacing */}
          <motion.div
            whileTap={{ scale: 1.3, rotate: 360 }} // Increased scale and added rotate animation
            className={`flex items-center cursor-pointer transition-transform duration-200 ${
              liked ? "text-red-500" : "text-gray-500"
            } text-2xl`} // Increased size
            onClick={handleLike}
          >
            <FaHeart />
          </motion.div>
          <motion.div
            whileTap={{ scale: 1.3, rotate: 180 }} // Increased scale and added rotate animation
            className="flex items-center cursor-pointer transition-transform duration-200 text-gray-500 text-2xl" // Increased size
            onClick={handleShowComments}
          >
            <FaComment />
          </motion.div>
          <motion.div
            whileTap={{ scale: 1.3, rotate: 360 }} // Increased scale and added rotate animation
            className={`flex items-center cursor-pointer transition-transform duration-200 ${
              saved ? "text-blue-500" : "text-gray-500"
            } text-2xl`} // Increased size
            onClick={handleSave}
          >
            <FaBookmark />
          </motion.div>
        </div>
      </div>

      {showComments && (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="space-y-2 mb-4">
            {comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-2">
                <p className="font-semibold">{comment.username}</p>
                <p>{comment.text}</p>
              </div>
            ))}
          </div>
          <form onSubmit={handleCommentSubmit} className="flex items-center">
            <input
              type="text"
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Add a comment..."
              className="flex-grow p-2 border border-gray-300 rounded-md
              bg-gray-800 text-sm"
            />
            <button
              type="submit"
              className="ml-2 bg-blue-500 text-white py-1 px-3 rounded text-sm"
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostCard;
