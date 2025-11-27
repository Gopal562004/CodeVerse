// // import React, { useState, useEffect } from "react";
// // import { useNavigate } from "react-router-dom"; // Import useNavigate
// // import { FaHeart, FaComment, FaBookmark } from "react-icons/fa";
// // import { FiHeart, FiSave } from "react-icons/fi";
// // import { Carousel } from "react-responsive-carousel";
// // import "react-responsive-carousel/lib/styles/carousel.min.css";
// // import axios from "axios";
// // import { useAuth } from "../../context/AuthContext";
// // import { deleteComment } from "../../lib/MongoDB/commet";
// // import { fetchLikesData } from "../../lib/MongoDB/likepost"
// // const defaultProfilePhoto =
// //   "http://localhost:5000/uploads/default-profile-photo.jpg";

// // const PostCard = ({ post }) => {
// //   const navigate = useNavigate();
// //   const { user } = useAuth();
// //   const [isExpanded, setIsExpanded] = useState(false);
// //   const [author, setAuthor] = useState(null);
// //   const [liked, setLiked] = useState(false);
// //   const [likeCount, setLikeCount] = useState(0);
// //   const [likes, setLikes] = useState([]);
// //   const [showComments, setShowComments] = useState(false);
// //   const [newComment, setNewComment] = useState("");
// //   const [comments, setComments] = useState([]);
// //   const [saved, setSaved] = useState(false);
// //   const [loadingComments, setLoadingComments] = useState(false);
// //   const [error, setError] = useState("");
// //   const BASE_URL = import.meta.env.VITE_API_URL;
// //   const token = localStorage.getItem("token");
// //   const [userId,setUserId] = useState("");
// //   useEffect(() => {
// //     const storedUser = localStorage.getItem("user");

// //     if (storedUser) {
// //       try {
// //         const parsedUser = JSON.parse(storedUser); // Parse the stored object
// //         if (parsedUser?._id) {
// //           setUserId(parsedUser._id); // Store the user ID in state
// //           //console.log("User ID:", parsedUser._id);
// //         }
// //       } catch (error) {
// //         console.error("Error parsing user data from localStorage:", error);
// //       }
// //     }
// //   }, []);
// //   // useEffect(() => {
// //   //   const fetchAuthor = async () => {
// //   //     if (post.author) {
// //   //       try {
// //   //         const response = await fetch(`${BASE_URL}/user/${post.author}`);
// //   //         const data = await response.json();
// //   //         setAuthor(data);
// //   //         console.log(data);
// //   //       } catch (error) {
// //   //         setError("Error fetching user data.");
// //   //       }
// //   //     }
// //   //   };

// //   //   fetchAuthor();
// //   // }, [post.author]);

// //   useEffect(() => {
// //     const fetchLikes = async () => {
// //       try {
// //         const response = await axios.get(`${BASE_URL}/posts/${post._id}/likes`);
// //         setLikeCount(response.data.likeCount);
// //         setLikes(response.data.likes || []);
// //       } catch (error) {
// //         setError("Error fetching likes.");
// //       }
// //     };

// //     fetchLikes();
// //   }, [post._id]);

// //   useEffect(() => {
// //     const checkSavedPost = async () => {
// //       if (user) {
// //         try {
// //           const response = await axios.get(
// //             `${BASE_URL}/posts/${post._id}/saved`,
// //             {
// //               headers: {
// //                 Authorization: `Bearer ${localStorage.getItem("token")}`,
// //               },
// //             }
// //           );
// //           setSaved(response.data.saved);
// //         } catch (error) {
// //           setError("Error checking saved status.");
// //         }
// //       }
// //     };

// //     checkSavedPost();
// //   }, [post._id, user]);

// //   const handleToggleExpand = () => {
// //     setIsExpanded((prev) => !prev);
// //   };

// //     const handleLikeToggle = async () => {
// //       if (!token) return alert("You need to log in to like posts.");
// //       const postId = post._id;

// //       try {
// //         if (liked) {
// //           await axios.post(
// //             `${BASE_URL}/posts/${postId}/unlike`,
// //             {},
// //             { headers: { Authorization: `Bearer ${token}` } }
// //           );
// //           setLiked(false);
// //           setLikeCount((prev) => prev - 1);
// //         } else {
// //           await axios.post(
// //             `${BASE_URL}/posts/${postId}/like`,
// //             {},
// //             { headers: { Authorization: `Bearer ${token}` } }
// //           );
// //           setLiked(true);
// //           setLikeCount((prev) => prev + 1);
// //         }
// //       } catch (error) {
// //         setError(liked ? "Error unliking post." : "Error liking post.");
// //       }
// //     };

// //   const handleSaveToggle = async () => {
// //     const postId = post._id;
// //     const token = localStorage.getItem("token");

// //    try {
// //      const response = await axios.post(
// //        `${BASE_URL}/posts/${postId}/save`,
// //        {},
// //        { headers: { Authorization: `Bearer ${token}` } }
// //      );
// //      //console.log("Save Response:", response);
// //      setSaved(true);
// //    } catch (error) {
// //      console.error("Error saving post:", error.response?.data || error.message);
// //    }

// //   };

// //   const handleCommentChange = (event) => {
// //     setNewComment(event.target.value);
// //   };

// //   const handleCommentSubmit = async (event) => {
// //     event.preventDefault();
// //     if (newComment.trim()) {
// //       try {
// //         const response = await axios.post(
// //           `${BASE_URL}/posts/${post._id}/comments`,
// //           { content: newComment },
// //           {
// //             headers: {
// //               Authorization: `Bearer ${localStorage.getItem("token")}`,
// //             },
// //           }
// //         );
// //         setComments((prevComments) => [...prevComments, response.data.comment]);
// //         setNewComment("");
// //       } catch (error) {
// //         setError("Error adding comment.");
// //       }
// //     }
// //   };

// //   const toggleComments = async () => {
// //     setShowComments((prev) => !prev);
// //     if (!showComments) {
// //       setLoadingComments(true);
// //       try {
// //         const response = await axios.get(
// //           `${BASE_URL}/posts/${post._id}/comments`
// //         );
// //         setComments(response.data || []);
// //         //console.log(response.data);
// //       } catch (error) {
// //         setError("Error fetching comments.");
// //       } finally {
// //         setLoadingComments(false);
// //       }
// //     }
// //   };
// //   const handleUsernameClick = (e) => {
// //     e.stopPropagation(); // Prevents the click from bubbling up to the card
// //     navigate(`/opponent-profile?userId=${post.author._id}`); // Navigate to the opponent profile page with userId
// //   };

// //  const handleDeleteComment = async (commentId) => {
// //     try {
// //       await deleteComment(commentId);
// //       setComments(comments.filter((comment) => comment._id !== commentId));
// //     } catch (error) {
// //       console.error("Error deleting comment");
// //     }
// //   };
// //   const handleCheckLike = async (postId)=>{
// //     try {
// //       const response = await fetchLikesData(postId);
// //       const userId = localStorage.getItem("userId"); // Assuming userId is stored in localStorage
// //       setLiked(response.likes.includes(userId)); // Check if the user has liked the post
// //     } catch (error) {
// //       console.error("Error checking like status:", error.message);
// //     }
// //   };
// //   //  useEffect(() => {
// //   //    handleCheckLike();
// //   //  }, [postId]);

// //   return (
// //     <div className="max-w-sm sm:max-w-md lg:max-w-lg rounded-lg overflow-hidden shadow-lg border border-gray-800 bg-black">
// //       {/* Error Message */}
// //       {error && <div className="text-red-500 text-center p-2">{error}</div>}

// //       {/* User Info Header */}
// //       <div
// //         className="flex items-center p-4 border-b border-gray-200 cursor-pointer"
// //         onClick={handleUsernameClick}
// //       >
// //         <img
// //           className="w-10 h-10 rounded-full object-cover"
// //           src={
// //             post.author?.profilePhoto
// //               ? `${`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/profile_photo%2F${post.author._id}%2F${post.author.profilePhoto}?alt=media`}`
// //               : defaultProfilePhoto
// //           }
// //           alt={`${author?.username || "User"}'s profile`}
// //         />
// //         <div className="ml-3 flex-grow">
// //           <p className="font-semibold text-lg mr-2">
// //             {post.author?.username || "Username"}
// //           </p>
// //         </div>
// //       </div>

// //       {/* Post Media */}
// //       <Carousel showArrows={true} infiniteLoop={true} showThumbs={false}>
// //         {post.media.map((mediaItem, index) => (
// //           <div key={index}>
// //             {mediaItem.type === "image" ? (
// //               <img
// //                 className="w-full max-h-96 object-cover"
// //                 src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${post.author._id}%2F${mediaItem.file_id}?alt=media`}
// //                 alt={post.caption}
// //               />
// //             ) : (
// //               <video
// //                 className="w-full max-h-96 object-cover"
// //                 controls
// //                 src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${post.author._id}%2F${mediaItem.file_id}?alt=media`}
// //               />
// //             )}
// //           </div>
// //         ))}
// //       </Carousel>

// //       {/* Caption and Description */}
// //       <div className="px-6 py-4">
// //         <div className="font-bold text-xl mb-2 text-wrap">{post.caption}</div>
// //         <p className="text-gray-700 text-base text-wrap">
// //           {isExpanded ? post.description : post.description.slice(0, 100)}{" "}
// //           {!isExpanded && post.description.length > 100 && " ..."}
// //         </p>
// //         <button
// //           onClick={handleToggleExpand}
// //           className="text-blue-500 hover:underline mt-2"
// //         >
// //           {isExpanded ? "Show Less" : "Read More"}
// //         </button>
// //       </div>

// //       {/* Post Actions */}
// //       <div className="px-6 pt-4 pb-2 flex items-center justify-between">
// //         <div className="flex space-x-4 items-center w-full">
// //           <div
// //             className={`flex items-center cursor-pointer text-2xl ${
// //               liked ? "text-white bg-red-500" : "text-gray-500"
// //             } p-2 rounded-full`}
// //             onClick={handleLikeToggle}
// //           >
// //             {liked ? <FiHeart /> : <FaHeart />}
// //           </div>
// //           <div
// //             className="flex items-center cursor-pointer text-2xl text-gray-500 p-2 rounded-full"
// //             onClick={toggleComments}
// //           >
// //             <FaComment />
// //           </div>
// //           <div
// //             className={`flex items-center cursor-pointer text-2xl ${
// //               saved ? "text-white bg-green-500" : "text-gray-500"
// //             } p-2 rounded-full`}
// //             onClick={handleSaveToggle}
// //           >
// //             {saved ? <FiSave /> : <FaBookmark />}
// //           </div>
// //         </div>
// //         <span className="text-gray-600">{likeCount} Likes</span>
// //       </div>

// //       {/* Comment Section */}
// //       {showComments && (
// //         <div className="px-6 py-4 border-t border-gray-200">
// //           <form onSubmit={handleCommentSubmit} className="flex">
// //             <input
// //               type="text"
// //               value={newComment}
// //               onChange={handleCommentChange}
// //               placeholder="Add a comment..."
// //               className="border border-gray-300 rounded-lg px-4 py-2 w-full bg-black"
// //             />
// //             <button
// //               type="submit"
// //               className="bg-blue-500 text-white rounded-lg px-4 py-2 ml-2"
// //             >
// //               Post
// //             </button>
// //           </form>

// //           {/* Loading Comments */}
// //           {loadingComments && <p>Loading comments...</p>}

// //           {/* Comments List */}
// //           {/* Comments List */}
// //           <div className="mt-4">
// //             {comments.length > 0 ? (
// //               comments.map((comment) => (
// //                 <div
// //                   key={comment._id}
// //                   className="flex items-start border-b border-gray-200 py-2"
// //                 >
// //                   {/* Assuming you have a profile photo URL */}
// //                   <img
// //                     src={
// //                       comment.author.profilePhoto ||
// //                       "/path/to/default/profile/photo.jpg"
// //                     } // Replace with actual profile photo path
// //                     alt={comment.author.name}
// //                     className="w-8 h-8 rounded-full mr-2" // Profile photo styling
// //                   />
// //                   <div>
// //                     <strong>{comment.author.name}</strong>{" "}
// //                     {/* Display user name */}
// //                     <div>
// //                       {comment.content}
// //                       <div
// //                         className="text-sm text-red cursor-pointer"
// //                         onClick={() => handleDeleteComment(comment._id)}
// //                       >
// //                         {comment.author._id == userId ? "delete" : ""}
// //                       </div>
// //                     </div>{" "}
// //                     {/* Display comment content */}
// //                   </div>
// //                 </div>
// //               ))
// //             ) : (
// //               <div>No comments yet.</div>
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default PostCard;
// // // import React, { useState, useEffect } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import { FaHeart, FaComment, FaBookmark } from "react-icons/fa";
// // // import { FiHeart, FiSave } from "react-icons/fi";
// // // import { Carousel } from "react-responsive-carousel";
// // // import "react-responsive-carousel/lib/styles/carousel.min.css";
// // // import axios from "axios";

// // // const defaultProfilePhoto =
// // //   "http://localhost:5000/uploads/default-profile-photo.jpg";

// // // const PostCard = ({ post }) => {
// // //   const navigate = useNavigate();
// // //   const [isExpanded, setIsExpanded] = useState(false);
// // //   const [author, setAuthor] = useState(null);
// // //   const [liked, setLiked] = useState(false);
// // //   const [likeCount, setLikeCount] = useState(0);
// // //   const [likes, setLikes] = useState([]);
// // //   const [showComments, setShowComments] = useState(false);
// // //   const [newComment, setNewComment] = useState("");
// // //   const [comments, setComments] = useState([]);
// // //   const [saved, setSaved] = useState(false);
// // //   const [loadingComments, setLoadingComments] = useState(false);
// // //   const [error, setError] = useState("");

// // //   const BASE_URL = import.meta.env.VITE_API_URL;
// // //   const token = localStorage.getItem("token");

// // //   useEffect(() => {
// // //     const fetchAuthor = async () => {
// // //       if (post.author) {
// // //         try {
// // //           const response = await axios.get(`${BASE_URL}/user/${post.author}`);
// // //           setAuthor(response.data);
// // //         } catch (error) {
// // //           setError("Error fetching user data.");
// // //         }
// // //       }
// // //     };
// // //     fetchAuthor();
// // //   }, [post.author]);

// // //   useEffect(() => {
// // //     const fetchLikes = async () => {
// // //       try {
// // //         const response = await axios.get(
// // //           `${BASE_URL}/posts/${post._id}/likes`,
// // //           {
// // //             headers: { Authorization: `Bearer ${token}` },
// // //           }
// // //         );
// // //         setLikeCount(response.data.likeCount);
// // //         setLikes(response.data.likes || []);
// // //       } catch (error) {
// // //         setError("Error fetching likes.");
// // //       }
// // //     };
// // //     if (token) fetchLikes();
// // //   }, [post._id, token]);

// // //   const handleLikeToggle = async () => {
// // //     if (!token) return alert("You need to log in to like posts.");
// // //     const postId = post._id;

// // //     try {
// // //       if (liked) {
// // //         await axios.post(
// // //           `${BASE_URL}/posts/${postId}/unlike`,
// // //           {},
// // //           { headers: { Authorization: `Bearer ${token}` } }
// // //         );
// // //         setLiked(false);
// // //         setLikeCount((prev) => prev - 1);
// // //       } else {
// // //         await axios.post(
// // //           `${BASE_URL}/posts/${postId}/like`,
// // //           {},
// // //           { headers: { Authorization: `Bearer ${token}` } }
// // //         );
// // //         setLiked(true);
// // //         setLikeCount((prev) => prev + 1);
// // //       }
// // //     } catch (error) {
// // //       setError(liked ? "Error unliking post." : "Error liking post.");
// // //     }
// // //   };

// // //   const handleSaveToggle = async () => {
// // //     if (!token) return alert("You need to log in to save posts.");
// // //     const postId = post._id;

// // //     try {
// // //       if (saved) {
// // //         await axios.post(
// // //           `${BASE_URL}/posts/${postId}/unsave`,
// // //           {},
// // //           { headers: { Authorization: `Bearer ${token}` } }
// // //         );
// // //         setSaved(false);
// // //       } else {
// // //         await axios.post(
// // //           `${BASE_URL}/posts/${postId}/save`,
// // //           {},
// // //           { headers: { Authorization: `Bearer ${token}` } }
// // //         );
// // //         setSaved(true);
// // //       }
// // //     } catch (error) {
// // //       setError(saved ? "Error unsaving post." : "Error saving post.");
// // //     }
// // //   };

// // //   const toggleComments = async () => {
// // //     setShowComments((prev) => !prev);
// // //     if (!showComments) {
// // //       setLoadingComments(true);
// // //       try {
// // //         const response = await axios.get(
// // //           `${BASE_URL}/posts/${post._id}/comments`,
// // //           {
// // //             headers: { Authorization: `Bearer ${token}` },
// // //           }
// // //         );
// // //         setComments(response.data || []);
// // //       } catch (error) {
// // //         setError("Error fetching comments.");
// // //       } finally {
// // //         setLoadingComments(false);
// // //       }
// // //     }
// // //   };
// // //    const handleUsernameClick = (e) => {
// // //     e.stopPropagation(); // Prevents the click from bubbling up to the card
// // //     navigate(`/opponent-profile?userId=${post.author}`); // Navigate to the opponent profile page with userId
// // //   };
// // //   return (
// // //     <div className="max-w-sm sm:max-w-md lg:max-w-lg rounded-lg overflow-hidden shadow-lg border border-gray-800 bg-black*">
// // //       {/* Error Message */}
// // //       {error && <div className="text-red-500 text-center p-2">{error}</div>}

// // //       {/* User Info Header */}
// // //       <div
// // //         className="flex items-center p-4 border-b border-gray-200 cursor-pointer"
// // //         onClick={handleUsernameClick}
// // //       >
// // //         <img
// // //           className="w-10 h-10 rounded-full object-cover"
// // //           src={
// // //             author?.profilePhoto
// // //               ? `${`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/profile_photo%2F${author._id}%2F${author.profilePhoto}?alt=media`}`
// // //               : defaultProfilePhoto
// // //           }
// // //           alt={`${author?.username || "User"}'s profile`}
// // //         />
// // //         <div className="ml-3 flex-grow">
// // //           <p className="font-semibold text-lg mr-2">
// // //             {author?.username || "Username"}
// // //           </p>
// // //         </div>
// // //       </div>

// // //       {/* Post Media */}
// // //       <Carousel showArrows={true} infiniteLoop={true} showThumbs={false}>
// // //         {post.media.map((mediaItem, index) => (
// // //           <div key={index}>
// // //             {mediaItem.type === "image" ? (
// // //               <img
// // //                 className="w-full max-h-96 object-cover"
// // //                 src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${post.author}%2F${mediaItem.file_id}?alt=media`}
// // //                 alt={post.caption}
// // //               />
// // //             ) : (
// // //               <video
// // //                 className="w-full max-h-96 object-cover"
// // //                 controls
// // //                 src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${post.author}%2F${mediaItem.file_id}?alt=media`}
// // //               />
// // //             )}
// // //           </div>
// // //         ))}
// // //       </Carousel>

// // //       {/* Post Actions */}
// // //       <div className="px-6 pt-4 pb-2 flex items-center justify-between">
// // //         <div className="flex space-x-4 items-center w-full">
// // //           <div
// // //             className={`flex items-center cursor-pointer text-2xl ${
// // //               liked ? "text-red-500" : "text-gray-500"
// // //             }`}
// // //             onClick={handleLikeToggle}
// // //           >
// // //             {liked ? <FaHeart /> : <FiHeart />}
// // //           </div>
// // //           <div
// // //             className="flex items-center cursor-pointer text-2xl text-gray-500"
// // //             onClick={toggleComments}
// // //           >
// // //             <FaComment />
// // //           </div>
// // //           <div
// // //             className={`flex items-center cursor-pointer text-2xl ${
// // //               saved ? "text-green-500" : "text-gray-500"
// // //             }`}
// // //             onClick={handleSaveToggle}
// // //           >
// // //             {saved ? <FiSave /> : <FaBookmark />}
// // //           </div>
// // //         </div>
// // //         <span className="text-gray-600">{likeCount} Likes</span>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default PostCard;


// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import axios from "axios";
// import { useAuth } from "../../context/AuthContext";
// import { deleteComment } from "../../lib/MongoDB/commet";
// import { fetchLikesData } from "../../lib/MongoDB/likepost";
// import {
//   Heart,
//   MessageCircle,
//   Bookmark,
//   Send,
//   User,
//   Play,
//   Trash2,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";

// const PostCard = ({ post }) => {
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const [isExpanded, setIsExpanded] = useState(false);
//   const [author, setAuthor] = useState(null);
//   const [liked, setLiked] = useState(false);
//   const [likeCount, setLikeCount] = useState(0);
//   const [likes, setLikes] = useState([]);
//   const [showComments, setShowComments] = useState(false);
//   const [newComment, setNewComment] = useState("");
//   const [comments, setComments] = useState([]);
//   const [saved, setSaved] = useState(false);
//   const [loadingComments, setLoadingComments] = useState(false);
//   const [error, setError] = useState("");

//   const BASE_URL = import.meta.env.VITE_API_URL;
//   const token = localStorage.getItem("token");
//   const [userId, setUserId] = useState("");

//   useEffect(() => {
//     console.log("Post data:", post);
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       try {
//         const parsedUser = JSON.parse(storedUser);
//         if (parsedUser?._id) {
//           setUserId(parsedUser._id);
//         }
//       } catch (error) {
//         console.error("Error parsing user data from localStorage:", error);
//       }
//     }
//   }, []);

//   useEffect(() => {
//     const fetchLikes = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/posts/${post._id}/likes`);
//         setLikeCount(response.data.likeCount);
//         setLikes(response.data.likes || []);
//       } catch (error) {
//         setError("Error fetching likes.");
//       }
//     };

//     fetchLikes();
//   }, [post._id]);

//   useEffect(() => {
//     const checkSavedPost = async () => {
//       if (user) {
//         try {
//           const response = await axios.get(
//             `${BASE_URL}/posts/${post._id}/saved`,
//             {
//               headers: {
//                 Authorization: `Bearer ${localStorage.getItem("token")}`,
//               },
//             }
//           );
//           setSaved(response.data.saved);
//         } catch (error) {
//           setError("Error checking saved status.");
//         }
//       }
//     };

//     checkSavedPost();
//   }, [post._id, user]);

//   const handleToggleExpand = () => {
//     setIsExpanded((prev) => !prev);
//   };

//   const handleLikeToggle = async () => {
//     if (!token) return alert("You need to log in to like posts.");
//     const postId = post._id;

//     try {
//       if (liked) {
//         await axios.post(
//           `${BASE_URL}/posts/${postId}/unlike`,
//           {},
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setLiked(false);
//         setLikeCount((prev) => prev - 1);
//       } else {
//         await axios.post(
//           `${BASE_URL}/posts/${postId}/like`,
//           {},
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         setLiked(true);
//         setLikeCount((prev) => prev + 1);
//       }
//     } catch (error) {
//       setError(liked ? "Error unliking post." : "Error liking post.");
//     }
//   };

//   const handleSaveToggle = async () => {
//     const postId = post._id;
//     const token = localStorage.getItem("token");

//     try {
//       const response = await axios.post(
//         `${BASE_URL}/posts/${postId}/save`,
//         {},
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setSaved(true);
//     } catch (error) {
//       console.error(
//         "Error saving post:",
//         error.response?.data || error.message
//       );
//     }
//   };

//   const handleCommentChange = (event) => {
//     setNewComment(event.target.value);
//   };

//   const handleCommentSubmit = async (event) => {
//     event.preventDefault();
//     if (newComment.trim()) {
//       try {
//         const response = await axios.post(
//           `${BASE_URL}/posts/${post._id}/comments`,
//           { content: newComment },
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         );
//         setComments((prevComments) => [...prevComments, response.data.comment]);
//         setNewComment("");
//       } catch (error) {
//         setError("Error adding comment.");
//       }
//     }
//   };

//   const toggleComments = async () => {
//     setShowComments((prev) => !prev);
//     if (!showComments) {
//       setLoadingComments(true);
//       try {
//         const response = await axios.get(
//           `${BASE_URL}/posts/${post._id}/comments`
//         );
//         setComments(response.data || []);
//       } catch (error) {
//         setError("Error fetching comments.");
//       } finally {
//         setLoadingComments(false);
//       }
//     }
//   };

//   const handleUsernameClick = (e) => {
//     e.stopPropagation();
//     navigate(`/opponent-profile?userId=${post.author._id}`);
//   };

//   const handleDeleteComment = async (commentId) => {
//     try {
//       await deleteComment(commentId);
//       setComments(comments.filter((comment) => comment._id !== commentId));
//     } catch (error) {
//       console.error("Error deleting comment");
//     }
//   };

//   const handleCheckLike = async (postId) => {
//     try {
//       const response = await fetchLikesData(postId);
//       const userId = localStorage.getItem("userId");
//       setLiked(response.likes.includes(userId));
//     } catch (error) {
//       console.error("Error checking like status:", error.message);
//     }
//   };

//   return (
//     <div className="max-w-sm sm:max-w-md lg:max-w-lg rounded-xl overflow-hidden border border-gray-800 bg-[#0a0f1f]">
//       {/* Error Message */}
//       {error && (
//         <div className="bg-red-600 text-white p-3 text-center">{error}</div>
//       )}

//       {/* User Info Header */}
//       <div
//         className="flex items-center p-4 border-b border-gray-800 cursor-pointer hover:bg-[#060711] transition-colors"
//         onClick={handleUsernameClick}
//       >
//         <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 overflow-hidden">
//           {post.author?.profilePhoto ? (
//             <img
//               className="w-full h-full object-cover"
//               src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/profile_photo%2F${post.author._id}%2F${post.author.profilePhoto}?alt=media`}
//               alt={`${post.author?.username || "User"}'s profile`}
//             />
//           ) : (
//             <div className="w-full h-full flex items-center justify-center">
//               <User size={20} className="text-gray-400" />
//             </div>
//           )}
//         </div>
//         <div className="ml-3">
//           <p className="font-semibold text-white">
//             {post.author?.username || "Username"}
//           </p>
//         </div>
//       </div>

//       {/* Post Media */}
//       <Carousel
//         showArrows={true}
//         infiniteLoop={true}
//         showThumbs={false}
//         showStatus={false}
//       >
//         {post.media.map((mediaItem, index) => (
//           <div key={index}>
//             {mediaItem.type === "image" ? (
//               <img
//                 className="w-full h-64 object-cover"
//                 src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${post.author._id}%2F${mediaItem.file_id}?alt=media`}
//                 alt={post.caption}
//               />
//             ) : (
//               <div className="relative">
//                 <video
//                   className="w-full h-64 object-cover"
//                   controls
//                   src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${post.author._id}%2F${mediaItem.file_id}?alt=media`}
//                 />
//                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//                   <Play size={48} className="text-white opacity-70" />
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </Carousel>

//       {/* Post Actions */}
//       <div className="p-4 border-b border-gray-800">
//         <div className="flex justify-between items-center">
//           <div className="flex space-x-4">
//             <button
//               className={`p-2 rounded-lg transition-colors ${
//                 liked
//                   ? "text-red-500 bg-red-500/10"
//                   : "text-gray-400 hover:text-white"
//               }`}
//               onClick={handleLikeToggle}
//             >
//               <Heart size={20} fill={liked ? "currentColor" : "none"} />
//             </button>
//             <button
//               className={`p-2 rounded-lg transition-colors ${
//                 showComments
//                   ? "text-blue-600 bg-blue-600/10"
//                   : "text-gray-400 hover:text-white"
//               }`}
//               onClick={toggleComments}
//             >
//               <MessageCircle size={20} />
//             </button>
//             <button
//               className={`p-2 rounded-lg transition-colors ${
//                 saved
//                   ? "text-blue-600 bg-blue-600/10"
//                   : "text-gray-400 hover:text-white"
//               }`}
//               onClick={handleSaveToggle}
//             >
//               <Bookmark size={20} fill={saved ? "currentColor" : "none"} />
//             </button>
//           </div>
//           <span className="text-gray-400 text-sm">{likeCount} likes</span>
//         </div>
//       </div>

//       {/* Caption and Description */}
//       <div className="p-4">
//         <div className="font-bold text-white mb-2 break-words">
//           {post.caption}
//         </div>
//         <div className="text-gray-400">
//           <div
//             className={`break-words whitespace-pre-wrap ${
//               !isExpanded && post.description.length > 150 ? "line-clamp-3" : ""
//             }`}
//           >
//             {post.description}
//           </div>
//           {post.description.length > 150 && (
//             <button
//               onClick={handleToggleExpand}
//               className="text-blue-600 hover:text-blue-500 mt-2 transition-colors flex items-center gap-1 text-sm"
//             >
//               {isExpanded ? (
//                 <>
//                   Show Less <ChevronUp size={16} />
//                 </>
//               ) : (
//                 <>
//                   Read More <ChevronDown size={16} />
//                 </>
//               )}
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Comment Section */}
//       {showComments && (
//         <div className="p-4 border-t border-gray-800">
//           <form onSubmit={handleCommentSubmit} className="flex gap-2 mb-4">
//             <input
//               type="text"
//               value={newComment}
//               onChange={handleCommentChange}
//               placeholder="Add a comment..."
//               className="flex-grow bg-[#060711] border border-gray-700 text-white p-2 rounded-lg text-sm focus:border-blue-600 focus:outline-none transition-colors"
//             />
//             <button
//               type="submit"
//               className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
//             >
//               <Send size={16} />
//             </button>
//           </form>

//           {/* Loading Comments */}
//           {loadingComments && (
//             <div className="text-center text-gray-400 py-4">
//               Loading comments...
//             </div>
//           )}

//           {/* Comments List */}
//           <div className="space-y-3 max-h-64 overflow-y-auto">
//             {comments.length > 0 ? (
//               comments.map((comment) => (
//                 <div
//                   key={comment._id}
//                   className="flex items-start gap-3 bg-[#060711] p-3 rounded-lg"
//                 >
//                   <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 overflow-hidden flex-shrink-0">
//                     {comment.author.profilePhoto ? (
//                       <img
//                         src={comment.author.profilePhoto}
//                         alt={comment.author.name}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center">
//                         <User size={14} className="text-gray-400" />
//                       </div>
//                     )}
//                   </div>
//                   <div className="flex-grow min-w-0">
//                     <div className="flex justify-between items-start">
//                       <span className="font-medium text-white text-sm break-words">
//                         {comment.author.name}
//                       </span>
//                       {comment.author._id === userId && (
//                         <button
//                           onClick={() => handleDeleteComment(comment._id)}
//                           className="text-red-600 hover:text-red-500 transition-colors flex-shrink-0 ml-2"
//                         >
//                           <Trash2 size={14} />
//                         </button>
//                       )}
//                     </div>
//                     <p className="text-gray-300 text-sm mt-1 break-words whitespace-pre-wrap">
//                       {comment.content}
//                     </p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <div className="text-center text-gray-400 py-4">
//                 No comments yet.
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PostCard;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { deleteComment } from "../../lib/MongoDB/commet";
import { fetchLikesData } from "../../lib/MongoDB/likepost";
import {
  Heart,
  MessageCircle,
  Bookmark,
  Send,
  User,
  Play,
  Trash2,
  ChevronDown,
  ChevronUp,
  MapPin,
  Tag,
  Code,
  Link,
  Calendar,
} from "lucide-react";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [author, setAuthor] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [likes, setLikes] = useState([]);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [saved, setSaved] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [error, setError] = useState("");

  const BASE_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const [userId, setUserId] = useState("");

  // Parse code snippets safely
  const parseCodeSnippets = () => {
    try {
      if (!post.codeSnippets || post.codeSnippets.trim() === "") return [];

      // Clean the string - remove trailing commas and fix formatting
      let cleanedCode = post.codeSnippets.trim();
      if (cleanedCode.endsWith(",")) {
        cleanedCode = cleanedCode.slice(0, -1);
      }

      return JSON.parse(cleanedCode);
    } catch (error) {
      console.error("Error parsing code snippets:", error);
      return [];
    }
  };

  const codeSnippets = parseCodeSnippets();

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
    const fetchLikes = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/posts/${post._id}/likes`);
        setLikeCount(response.data.likeCount);
        setLikes(response.data.likes || []);
      } catch (error) {
        setError("Error fetching likes.");
      }
    };

    fetchLikes();
  }, [post._id]);

  useEffect(() => {
    const checkSavedPost = async () => {
      if (user) {
        try {
          const response = await axios.get(
            `${BASE_URL}/posts/${post._id}/saved`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setSaved(response.data.saved);
        } catch (error) {
          setError("Error checking saved status.");
        }
      }
    };

    checkSavedPost();
  }, [post._id, user]);

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleLikeToggle = async () => {
    if (!token) return alert("You need to log in to like posts.");
    const postId = post._id;

    try {
      if (liked) {
        await axios.post(
          `${BASE_URL}/posts/${postId}/unlike`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLiked(false);
        setLikeCount((prev) => prev - 1);
      } else {
        await axios.post(
          `${BASE_URL}/posts/${postId}/like`,
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLiked(true);
        setLikeCount((prev) => prev + 1);
      }
    } catch (error) {
      setError(liked ? "Error unliking post." : "Error liking post.");
    }
  };

  const handleSaveToggle = async () => {
    const postId = post._id;
    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${BASE_URL}/posts/${postId}/save`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSaved(true);
    } catch (error) {
      console.error(
        "Error saving post:",
        error.response?.data || error.message
      );
    }
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    if (newComment.trim()) {
      try {
        const response = await axios.post(
          `${BASE_URL}/posts/${post._id}/comments`,
          { content: newComment },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setComments((prevComments) => [...prevComments, response.data.comment]);
        setNewComment("");
      } catch (error) {
        setError("Error adding comment.");
      }
    }
  };

  const toggleComments = async () => {
    setShowComments((prev) => !prev);
    if (!showComments) {
      setLoadingComments(true);
      try {
        const response = await axios.get(
          `${BASE_URL}/posts/${post._id}/comments`
        );
        setComments(response.data || []);
      } catch (error) {
        setError("Error fetching comments.");
      } finally {
        setLoadingComments(false);
      }
    }
  };

  const handleUsernameClick = (e) => {
    e.stopPropagation();
    navigate(`/opponent-profile?userId=${post.author._id}`);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (error) {
      console.error("Error deleting comment");
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="max-w-sm sm:max-w-md lg:max-w-lg rounded-xl overflow-hidden bg-[#0a0f1f]">
      {/* Error Message */}
      {error && (
        <div className="bg-red-600 text-white p-3 text-center">{error}</div>
      )}

      {/* User Info Header */}
      <div
        className="flex items-center p-4 border-b border-gray-800 cursor-pointer hover:bg-[#060711] transition-colors"
        onClick={handleUsernameClick}
      >
        <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 overflow-hidden">
          {post.author?.profilePhoto ? (
            <img
              className="w-full h-full object-cover"
              src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/profile_photo%2F${post.author._id}%2F${post.author.profilePhoto}?alt=media`}
              alt={`${post.author?.username || "User"}'s profile`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <User size={20} className="text-gray-400" />
            </div>
          )}
        </div>
        <div className="ml-3 flex-grow">
          <p className="font-semibold text-white">
            {post.author?.username || "Username"}
          </p>
          <p className="text-gray-400 text-sm">{post.author?.name}</p>
        </div>
        <div className="flex items-center gap-1 text-gray-400 text-sm">
          <Calendar size={14} />
          <span>{formatDate(post.createdAt)}</span>
        </div>
      </div>

      {/* Post Media */}
      <Carousel
        showArrows={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
      >
        {post.media.map((mediaItem, index) => (
          <div key={index}>
            {mediaItem.type === "image" ? (
              <img
                className="w-full h-64 object-cover"
                src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${post.author._id}%2F${mediaItem.file_id}?alt=media`}
                alt={post.caption}
              />
            ) : (
              <div className="relative">
                <video
                  className="w-full h-64 object-cover"
                  controls
                  src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${post.author._id}%2F${mediaItem.file_id}?alt=media`}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <Play size={48} className="text-white opacity-70" />
                </div>
              </div>
            )}
          </div>
        ))}
      </Carousel>

      {/* Post Actions */}
      <div className="p-4 border-b border-gray-800">
        <div className="flex justify-between items-center">
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
      </div>

      {/* Caption and Description */}
      <div className="p-4 border-b border-gray-800">
        <div className="font-bold text-white mb-2 break-words text-lg">
          {post.caption}
        </div>
        <div className="text-gray-400">
          <div
            className={`break-words whitespace-pre-wrap ${
              !isExpanded ? "line-clamp-3" : ""
            }`}
          >
            {post.description}
          </div>
          {post.description.length > 150 && (
            <button
              onClick={handleToggleExpand}
              className="text-blue-600 hover:text-blue-500 mt-2 transition-colors flex items-center gap-1 text-sm"
            >
              {isExpanded ? (
                <>
                  Show Less <ChevronUp size={16} />
                </>
              ) : (
                <>
                  Read More <ChevronDown size={16} />
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Project Details - Only show when description is expanded */}
      {isExpanded && (
        <div className="p-4 space-y-3 border-b border-gray-800">
          {/* Location */}
          {post.location && (
            <div className="flex items-center gap-2 text-gray-400">
              <MapPin size={16} />
              <span className="text-sm">{post.location}</span>
            </div>
          )}

          {/* Project URL */}
          {post.projectURL && (
            <div className="flex items-center gap-2">
              <Link size={16} className="text-blue-600" />
              <a
                href={post.projectURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-500 text-sm break-all"
              >
                {post.projectURL}
              </a>
            </div>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex items-start gap-2">
              <Tag size={16} className="text-gray-400 mt-1 flex-shrink-0" />
              <div className="flex flex-wrap gap-1">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack */}
          {post.techStack && post.techStack.length > 0 && (
            <div className="flex items-start gap-2">
              <Code size={16} className="text-blue-600 mt-1 flex-shrink-0" />
              <div className="flex flex-wrap gap-1">
                {post.techStack.map((tech, index) => (
                  <span
                    key={index}
                    className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Code Snippets */}
          {codeSnippets.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-blue-600 text-sm mb-2">
                <Code size={16} />
                Code Snippets
              </div>
              <div className="space-y-3">
                {codeSnippets.map((snippet, index) => (
                  <div key={index} className="bg-[#060711] rounded-lg p-3">
                    <div className="text-blue-400 text-sm font-mono font-semibold mb-2">
                      {snippet.language}
                    </div>
                    <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap break-words">
                      {snippet.code}
                    </pre>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Comment Section */}
      {showComments && (
        <div className="p-4">
          <form onSubmit={handleCommentSubmit} className="flex gap-2 mb-4">
            <input
              type="text"
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Add a comment..."
              className="flex-grow bg-[#060711] border border-gray-700 text-white p-2 rounded-lg text-sm focus:border-blue-600 focus:outline-none transition-colors"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Send size={16} />
            </button>
          </form>

          {/* Loading Comments */}
          {loadingComments && (
            <div className="text-center text-gray-400 py-4">
              Loading comments...
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment._id}
                  className="flex items-start gap-3 bg-[#060711] p-3 rounded-lg"
                >
                  <div className="w-8 h-8 rounded-full bg-gray-800 border border-gray-700 overflow-hidden flex-shrink-0">
                    {comment.author.profilePhoto ? (
                      <img
                        src={comment.author.profilePhoto}
                        alt={comment.author.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User size={14} className="text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-white text-sm break-words">
                        {comment.author.name}
                      </span>
                      {comment.author._id === userId && (
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="text-red-600 hover:text-red-500 transition-colors flex-shrink-0 ml-2"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                    <p className="text-gray-300 text-sm mt-1 break-words whitespace-pre-wrap">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-400 py-4">
                No comments yet.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;