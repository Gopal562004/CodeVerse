import React, { useState, useEffect } from "react";
import { FaHeart, FaComment, FaBookmark } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const defaultProfilePhoto =
  "http://localhost:5000/uploads/default-profile-photo.jpg";

const PostCard = ({ post }) => {
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [author, setAuthor] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likes, setLikes] = useState([]);
  const [showLikesModal, setShowLikesModal] = useState(false);
  const [visibleLikesCount, setVisibleLikesCount] = useState(3);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

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

  useEffect(() => {
    if (user && post.likedBy) {
      setLiked(post.likedBy.includes(user.id));
    }
  }, [post.likedBy, user]);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/posts/${post._id}/likes`
        );
        setLikeCount(response.data.likeCount);
        setLikes(response.data.likes || []); // Ensure likes is always an array
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };

    fetchLikes();
  }, [post._id]);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLikeToggle = async () => {
    const postId = post._id;
    const token = localStorage.getItem("token");

    if (liked) {
      try {
        await axios.post(
          `http://localhost:5000/posts/${postId}/unlike`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLiked(false);
        setLikeCount((prevCount) => prevCount - 1);
        setLikes((prevLikes) =>
          prevLikes.filter((like) => like.user._id !== user.id)
        );
      } catch (error) {
        console.error("Error unliking post:", error);
      }
    } else {
      try {
        await axios.post(
          `http://localhost:5000/posts/${postId}/like`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLiked(true);
        setLikeCount((prevCount) => prevCount + 1);
        setLikes((prevLikes) => [...prevLikes, { user }]);
      } catch (error) {
        console.error("Error liking post:", error);
      }
    }
  };

  const handleShowLikesModal = () => {
    setShowLikesModal(true);
  };

  const handleCloseLikesModal = () => {
    setShowLikesModal(false);
  };

  const handleShowMoreLikes = () => {
    setVisibleLikesCount((prevCount) => Math.min(prevCount + 3, likeCount));
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim()) {
      setComments((prevComments) => [
        ...prevComments,
        {
          id: comments.length + 1,
          username: user.username || "You",
          text: newComment,
        },
      ]);
      setNewComment("");
    }
  };

  return (
    <div className="max-w-sm sm:max-w-md lg:max-w-lg rounded-lg overflow-hidden shadow-lg border border-gray-800">
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
          <p className="font-semibold text-lg mr-2">
            {author?.username || "Username"}
          </p>
        </div>
      </div>

      {/* Post Media */}
      <Carousel showArrows={true} infiniteLoop={true} showThumbs={false}>
        {post.media.map((mediaItem, index) => (
          <div key={index}>
            {mediaItem.type === "image" ? (
              <img
                className="w-full max-h-96 object-cover"
                src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${post.author}%2F${mediaItem.file_id}?alt=media`}
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

      {/* Caption and Description */}
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{post.caption}</div>
        <p className="text-gray-700 text-base">{post.description}</p>
        <button
          onClick={handleToggleExpand}
          className="text-blue-500 hover:underline mt-2"
        >
          {isExpanded ? "Show Less" : "Show More"}
        </button>
      </div>

      {/* Post Actions */}
      <div className="px-6 pt-4 pb-2 flex items-center justify-between">
        <div className="flex space-x-8 items-center">
          <div
            className={`flex items-center cursor-pointer text-2xl ${
              liked ? "text-white bg-red-500" : "text-gray-500"
            } p-2 rounded-full`}
            onClick={handleLikeToggle}
          >
            <FaHeart />
          </div>
          <p
            className="text-gray-500 cursor-pointer"
            onClick={handleShowLikesModal}
          >
            {likeCount} likes
          </p>
          <div className="flex items-center cursor-pointer text-gray-500 text-2xl">
            <FaComment />
          </div>
          <div className="flex items-center cursor-pointer text-gray-500 text-2xl">
            <FaBookmark />
          </div>
        </div>
      </div>

      {/* Likes Modal */}
      {showLikesModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-70">
          <div className="bg-gray-900 rounded-lg p-4 max-w-md w-full">
            <h2 className="text-lg font-bold text-white mb-2">Liked by</h2>
            <ul className="list-disc ml-4 text-gray-300">
              {likes.slice(0, visibleLikesCount).map((like) => (
                <li
                  key={like.user?._id || like.user?.username}
                  className="text-gray-300"
                >
                  {like.user ? like.user.username : "Unknown User"}
                </li>
              ))}
            </ul>
            {visibleLikesCount < likeCount && (
              <button
                onClick={handleShowMoreLikes}
                className="m-4 bg-blue-500 text-white py-1 px-2 rounded"
              >
                Show More
              </button>
            )}
            <button
              onClick={handleCloseLikesModal}
              className="mt-6 bg-gray-300 text-gray-700 py-1 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Comment Section */}
      <form
        onSubmit={handleCommentSubmit}
        className="px-6 py-4 flex items-center"
      >
        <input
          type="text"
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Add a comment..."
          className="flex-grow p-2 border border-gray-300 rounded-md bg-gray-800 text-sm"
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white py-1 px-3 rounded text-sm"
        >
          Post
        </button>
      </form>

      {/* Display Comments */}
      <div className="px-6 py-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-2">
            <span className="font-semibold text-gray-300">
              {comment.username}:
            </span>
            <span className="text-gray-400">{comment.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostCard;
