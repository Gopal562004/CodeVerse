// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaHeart, FaComment, FaBookmark } from "react-icons/fa";
// import { FiHeart, FiSave } from "react-icons/fi";
// import axios from "axios";
// import { useAuth } from "../../context/AuthContext";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import {
//   createComment,
//   getComments,
//   updateComment,
//   deleteComment,
// } from "../../lib/MongoDB/commet";
// const defaultProfilePhoto =
//   "http://localhost:5000/uploads/default-profile-photo.jpg";

// const ExtraPostCard = ({ post }) => {
//   const navigate = useNavigate();
//   const { user } = useAuth() ||{};
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [author, setAuthor] = useState(null);
//   const [liked, setLiked] = useState(false);
//   const [likeCount, setLikeCount] = useState(0);
//   const [showComments, setShowComments] = useState(false);
//   const [newComment, setNewComment] = useState("");
//   const [comments, setComments] = useState([]);
//   const [saved, setSaved] = useState(false);
//   const [loadingComments, setLoadingComments] = useState(false);
//   const [error, setError] = useState("");

//   const BASE_URL = import.meta.env.VITE_API_URL;
//   const token = localStorage.getItem("token");
//   const [userId,setUserId] = useState("");
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");

//     if (storedUser) {
//       try {
//         const parsedUser = JSON.parse(storedUser); // Parse the stored object
//         if (parsedUser?._id) {
//           setUserId(parsedUser._id); // Store the user ID in state
//           console.log("User ID:", parsedUser._id);
//         }
//       } catch (error) {
//         console.error("Error parsing user data from localStorage:", error);
//       }
//     }
//   }, []);
//   useEffect(() => {
//     const fetchAuthor = async () => {
//       if (post.author) {
//         try {
//           const response = await axios.get(`${BASE_URL}/user/${post.author}`);
//           setAuthor(response.data);
//           console.log(user);
//         } catch (error) {
//           setError("Error fetching user data.");
//         }
//       }
//     };
//     fetchAuthor();
//   }, [post.author]);

//   useEffect(() => {
//     const fetchLikes = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/posts/${post._id}/likes`);
//         setLikeCount(response.data.likeCount);
//       } catch (error) {
//         setError("Error fetching likes.");
//       }
//     };
//     fetchLikes();
//   }, [post._id]);

//   const handleLikeToggle = async () => {
//     if (!token) return alert("You need to log in to like posts.");
//     try {
//       const url = `${BASE_URL}/posts/${post._id}/${liked ? "unlike" : "like"}`;
//       await axios.post(
//         url,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setLiked(!liked);
//       setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
//     } catch (error) {
//       setError(liked ? "Error unliking post." : "Error liking post.");
//     }
//   };

//   const handleSaveToggle = async () => {
//     if (!token) return alert("You need to log in to save posts.");
//     try {
//       await axios.post(
//         `${BASE_URL}/posts/${post._id}/save`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setSaved(!saved);
//     } catch (error) {
//       setError("Error saving post.");
//     }
//   };

//   const toggleComments = async () => {
//     setShowComments(!showComments);
//     if (!showComments) {
//       setLoadingComments(true);
//       try {
//         const response = await getComments(post._id);
//         setComments(response || []);
//         console.log(response);
//       } catch (error) {
//         setError("Error fetching comments.");
//       } finally {
//         setLoadingComments(false);
//       }
//     }
//   };

//   const handleCommentSubmit = async (event) => {
//     event.preventDefault();
//     if (newComment.trim()) {
//       try {
//         const response = await createComment(post._id, newComment);
//         setComments((prevComments) => [...prevComments, response.comment]);
//         setNewComment("");
//       } catch (error) {
//         setError("Error adding comment.");
//       }
//     }
//   };
//   const handleCommentEdit = async (event) => {};
//   // Handle comment deletion
//  const handleDeleteComment = async (commentId) => {
//     try {
//       await deleteComment(commentId);
//       setComments(comments.filter((comment) => comment._id !== commentId));
//     } catch (error) {
//       console.error("Error deleting comment");
//     }
//   };
//   return (
//     <div className="flex max-w-4xl w-full bg-black border border-gray-800 rounded-lg overflow-hidden shadow-lg">
//       {/* Left Side - Post Content */}
//       <div className="flex-grow">
//         {/* User Info */}
//         <div
//           className="flex items-center p-4 border-b border-gray-700 cursor-pointer"
//           onClick={() => navigate(`/opponent-profile?userId=${post.author._id}`)}
//         >
//           <img
//             className="w-10 h-10 rounded-full"
//             src={post.author?.profilePhoto || defaultProfilePhoto}
//             alt="Profile"
//           />
//           <p className="ml-3 font-semibold text-lg">
//             {post.author?.username || "Username"}
//           </p>
//         </div>

//         {/* Post Media */}
//         <Carousel showArrows={true} infiniteLoop={true} showThumbs={false}>
//           {post.media.map((mediaItem, index) => (
//             <div key={index}>
//               {mediaItem.type.startsWith("image") ? (
//                 <img
//                   className="w-full max-h-96 object-cover"
//                   src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${post.author._id}%2F${mediaItem.file_id}?alt=media`}
//                   alt={post.caption}
//                 />
//               ) : (
//                 <video
//                   className="w-full max-h-96 object-cover"
//                   controls
//                   src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${post.author}%2F${mediaItem.file_id}?alt=media`}
//                 />
//               )}
//             </div>
//           ))}
//         </Carousel>

//         {/* Caption */}
//         <div className="p-4">
//           <p className="font-bold text-lg">{post.caption}</p>
//           <p className="text-gray-400">
//             {isExpanded ? post.description : post.description.slice(0, 100)}{" "}
//             {post.description.length > 100 && !isExpanded && "..."}
//             <button
//               onClick={() => setIsExpanded(!isExpanded)}
//               className="text-blue-500"
//             >
//               {" "}
//               {isExpanded ? "Show Less" : "Read More"}{" "}
//             </button>
//           </p>
//         </div>

//         {/* Post Actions */}
//         <div className="p-4 flex justify-between items-center">
//           <div className="flex space-x-4">
//             <button
//               className={`text-2xl ${liked ? "text-red-500" : "text-gray-500"}`}
//               onClick={handleLikeToggle}
//             >
//               {liked ? <FaHeart /> : <FiHeart />}
//             </button>
//             <button className="text-2xl text-gray-500" onClick={toggleComments}>
//               <FaComment />
//             </button>
//             <button
//               className={`text-2xl ${
//                 saved ? "text-green-500" : "text-gray-500"
//               }`}
//               onClick={handleSaveToggle}
//             >
//               {saved ? <FiSave /> : <FaBookmark />}
//             </button>
//           </div>
//           <span className="text-gray-400">{likeCount} Likes</span>
//         </div>
//       </div>

//       {/* Comment Section - Fixed Width (Does NOT shrink the post) */}
//       {showComments && (
//         <div className="w-1/3 lg:w-full p-4 border-l border-gray-700 bg-black">
//           <h3 className="text-lg font-semibold text-white">Comments</h3>
//           <div className="max-h-96 overflow-y-auto space-y-3">
//             {loadingComments ? (
//               <p className="text-gray-500">Loading...</p>
//             ) : comments.length > 0 ? (
//               comments.map((comment) => (
//                 <div key={comment._id} className="p-3 bg-gray-900 rounded-lg">
//                   <p className="text-gray-300 font-semibold">
//                     <strong>{comment.author.name}</strong>{" "}
//                   </p>
//                   <p className="text-gray-400">
//                     {comment.content}
//                     <div
//                       className="text-sm text-red cursor-pointer"
//                       onClick={() => handleDeleteComment(comment._id)}
//                     >
//                       {comment.author._id == userId ? "delete" : ""}
//                     </div>
//                   </p>
//                 </div>
//               ))
//             ) : (
//               <p className="text-gray-500">
//                 No comments yet. Be the first to comment!
//               </p>
//             )}
//           </div>
//           <form onSubmit={handleCommentSubmit} className="mt-4 flex">
//             <input
//               type="text"
//               className="flex-grow bg-gray-900 text-white p-2 rounded-l"
//               placeholder="Write a comment..."
//               value={newComment}
//               onChange={(e) => setNewComment(e.target.value)}
//             />
//             <button
//               type="submit"
//               className="bg-blue-500 p-2 rounded-r hover:bg-blue-600"
//             >
//               Post
//             </button>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExtraPostCard;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
  createComment,
  getComments,
  deleteComment,
} from "../../lib/MongoDB/commet";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Send,
  Play,
  User,
  Trash2,
  ChevronDown,
  ChevronUp,
  X,
} from "lucide-react";

const ExtraPostCard = ({ post }) => {
  const navigate = useNavigate();
  const { user } = useAuth() || {};
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
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser?._id) {
          setUserId(parsedUser._id);
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
    if (!showComments) {
      setLoadingComments(true);
      try {
        const response = await getComments(post._id);
        setComments(response || []);
      } catch (error) {
        setError("Error fetching comments.");
      } finally {
        setLoadingComments(false);
      }
    }
    setShowComments(!showComments);
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

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("Error deleting comment");
    }
  };

  return (
    <>
      {/* Main Post Card */}
      <div className="max-w-4xl w-full bg-[#0a0f1f] rounded-xl overflow-hidden">
        {/* User Info */}
        <div
          className="flex items-center p-4 border-b border-gray-800 cursor-pointer hover:bg-gray-900 transition-colors"
          onClick={() =>
            navigate(`/opponent-profile?userId=${post.author._id}`)
          }
        >
          <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 overflow-hidden">
            {post.author?.profilePhoto ? (
              <img
                className="w-full h-full object-cover"
                src={post.author.profilePhoto}
                alt="Profile"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <User size={20} className="text-gray-400" />
              </div>
            )}
          </div>
          <p className="ml-3 font-semibold text-white">
            {post.author?.username || "Username"}
          </p>
        </div>

        {/* Post Media */}
        <div className="relative">
          <Carousel
            showArrows={true}
            infiniteLoop={true}
            showThumbs={false}
            showStatus={false}
          >
            {post.media.map((mediaItem, index) => (
              <div key={index}>
                {mediaItem.type.startsWith("image") ? (
                  <img
                    className="w-full max-h-96 object-cover"
                    src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${post.author._id}%2F${mediaItem.file_id}?alt=media`}
                    alt={post.caption}
                  />
                ) : (
                  <div className="relative">
                    <video
                      className="w-full max-h-96 object-cover"
                      controls
                      src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${post.author}%2F${mediaItem.file_id}?alt=media`}
                    />
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <Play size={48} className="text-white opacity-70" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </Carousel>
        </div>

        {/* Post Actions */}
        <div className="p-4 flex justify-between items-center border-b border-gray-800">
          <div className="flex space-x-4">
            <button
              className={`p-2 rounded-lg transition-colors ${
                liked
                  ? "text-red-500 bg-red-500/10"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={handleLikeToggle}
            >
              <Heart size={20} fill={liked ? "currentColor" : "none"} />
            </button>
            <button
              className={`p-2 rounded-lg transition-colors ${
                showComments
                  ? "text-blue-600 bg-blue-600/10"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={toggleComments}
            >
              <MessageCircle size={20} />
            </button>
            <button
              className={`p-2 rounded-lg transition-colors ${
                saved
                  ? "text-blue-600 bg-blue-600/10"
                  : "text-gray-400 hover:text-white"
              }`}
              onClick={handleSaveToggle}
            >
              <Bookmark size={20} fill={saved ? "currentColor" : "none"} />
            </button>
          </div>
          <span className="text-gray-400 text-sm">{likeCount} likes</span>
        </div>

        {/* Caption */}
        <div className="p-4">
          <p className="font-bold text-white mb-2">{post.caption}</p>
          <p className="text-gray-400">
            {isExpanded
              ? post.description
              : `${post.description.slice(0, 100)}${
                  post.description.length > 100 ? "..." : ""
                }`}
            {post.description.length > 100 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-blue-600 hover:text-blue-500 ml-2 transition-colors"
              >
                {isExpanded ? (
                  <span className="flex items-center gap-1">
                    Show Less <ChevronUp size={16} />
                  </span>
                ) : (
                  <span className="flex items-center gap-1">
                    Read More <ChevronDown size={16} />
                  </span>
                )}
              </button>
            )}
          </p>
        </div>
      </div>

      {/* Comments Modal - Instagram Style */}
      {showComments && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#0a0f1f] rounded-xl max-w-6xl w-full max-h-[90vh] flex border border-gray-800">
            {/* Left Side - Post Content */}
            <div className="w-1/2 border-r border-gray-800">
              <div className="relative h-full">
                <Carousel
                  showArrows={true}
                  infiniteLoop={true}
                  showThumbs={false}
                  showStatus={false}
                  className="h-full"
                >
                  {post.media.map((mediaItem, index) => (
                    <div key={index} className="h-full">
                      {mediaItem.type.startsWith("image") ? (
                        <img
                          className="w-full h-full object-contain bg-black"
                          src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${post.author._id}%2F${mediaItem.file_id}?alt=media`}
                          alt={post.caption}
                        />
                      ) : (
                        <div className="h-full relative">
                          <video
                            className="w-full h-full object-contain bg-black"
                            controls
                            src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${post.author}%2F${mediaItem.file_id}?alt=media`}
                          />
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <Play size={48} className="text-white opacity-70" />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </Carousel>
              </div>
            </div>

            {/* Right Side - Comments Section */}
            <div className="w-1/2 flex flex-col">
              {/* User Info Header */}
              <div className="flex items-center p-4 border-b border-gray-800">
                <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 overflow-hidden">
                  {post.author?.profilePhoto ? (
                    <img
                      className="w-full h-full object-cover"
                      src={post.author.profilePhoto}
                      alt="Profile"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User size={20} className="text-gray-400" />
                    </div>
                  )}
                </div>
                <p className="ml-3 font-semibold text-white">
                  {post.author?.username || "Username"}
                </p>
                <button
                  onClick={toggleComments}
                  className="ml-auto text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Comments List - Scrollable */}
              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {/* Post Caption as first comment */}
                <div className="flex space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 overflow-hidden flex-shrink-0">
                    {post.author?.profilePhoto ? (
                      <img
                        className="w-full h-full object-cover"
                        src={post.author.profilePhoto}
                        alt="Profile"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User size={16} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <p className="text-white font-medium text-sm">
                      {post.author?.username || "Username"}
                    </p>
                    <p className="text-gray-300 text-sm mt-1">{post.caption}</p>
                    <p className="text-gray-400 text-sm mt-1">
                      {post.description}
                    </p>
                  </div>
                </div>

                {/* Actual Comments */}
                {loadingComments ? (
                  <div className="flex justify-center items-center h-32">
                    <p className="text-gray-400">Loading comments...</p>
                  </div>
                ) : comments.length > 0 ? (
                  comments.map((comment) => (
                    <div key={comment._id} className="flex space-x-3">
                      <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 overflow-hidden flex-shrink-0">
                        {comment.author.profilePhoto ? (
                          <img
                            className="w-full h-full object-cover"
                            src={comment.author.profilePhoto}
                            alt="Profile"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <User size={16} className="text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-grow">
                        <div className="flex justify-between items-start">
                          <p className="text-white font-medium text-sm">
                            {comment.author.name}
                          </p>
                          {comment.author._id === userId && (
                            <button
                              onClick={() => handleDeleteComment(comment._id)}
                              className="text-red-600 hover:text-red-500 transition-colors ml-2"
                            >
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                        <p className="text-gray-300 text-sm mt-1">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center h-32 text-gray-400">
                    <MessageCircle size={32} className="mb-2 opacity-50" />
                    <p className="text-center text-sm">
                      No comments yet.
                      <br />
                      Be the first to comment!
                    </p>
                  </div>
                )}
              </div>

              {/* Post Actions */}
              <div className="p-4 border-t border-gray-800">
                <div className="flex space-x-4 mb-3">
                  <button
                    className={`p-2 rounded-lg transition-colors ${
                      liked
                        ? "text-red-500 bg-red-500/10"
                        : "text-gray-400 hover:text-white"
                    }`}
                    onClick={handleLikeToggle}
                  >
                    <Heart size={20} fill={liked ? "currentColor" : "none"} />
                  </button>
                  <button
                    className={`p-2 rounded-lg transition-colors ${
                      saved
                        ? "text-blue-600 bg-blue-600/10"
                        : "text-gray-400 hover:text-white"
                    }`}
                    onClick={handleSaveToggle}
                  >
                    <Bookmark
                      size={20}
                      fill={saved ? "currentColor" : "none"}
                    />
                  </button>
                </div>
                <span className="text-gray-400 text-sm">{likeCount} likes</span>
              </div>

              {/* Comment Input */}
              <div className="p-4 border-t border-gray-800">
                <form onSubmit={handleCommentSubmit} className="flex gap-2">
                  <input
                    type="text"
                    className="flex-grow bg-[#060711] border border-gray-700 text-white p-2 rounded-lg text-sm focus:border-blue-600 focus:outline-none transition-colors"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors text-sm"
                  >
                    Post
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ExtraPostCard;