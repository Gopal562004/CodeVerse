// import React, { useState, useEffect } from "react";
// import { useAuth } from "../../context/AuthContext";
// import axios from "axios";
// import ExtraPostCard from "./ExtraPostCard";
// import followServices from "../../lib/MongoDB/follow";
// const Profile = () => {
//   const { user: authUser } = useAuth(); // Get user from auth context
//   const [userId, setUserId] = useState("");
//   const [username, setUsername] = useState("");
//   const [name, setName] = useState("");
//   const [user, setUser] = useState(null); // Set initial user state to null
//   const [fileName, setFileName] = useState(null);
//   const [posts, setPosts] = useState([]); // State for user posts
//   const [savedPosts, setSavedPosts] = useState([]); // State for saved posts
//   const [loading, setLoading] = useState(true); // Loading state
//   const [activeTab, setActiveTab] = useState("projects");
//   const [profilePhoto, setProfilePhoto] = useState(null); // State for selected profile photo
//   const [isUploadVisible, setIsUploadVisible] = useState(false); 
//   const [uploadMessage, setUploadMessage] = useState(""); 
//   const [selectedProject, setSelectedProject] = useState(null);
//   const BASE_URL = import.meta.env.VITE_API_URL;
//   const [followCount, setFollowCount] = useState({
//     followers: 0,
//     following: 0,
//   });
//   const [showFollowModal, setShowFollowModal] = useState(false);
//   const [followList, setFollowList] = useState([]);
//   const [followType, setFollowType] = useState("");

// const handleProjectClick = async (projectId) => {
//   try {
//     // const response = await axios.get(`${BASE_URL}/posts/${projectId}`);
//     setSelectedProject(projectId);
//     // console.log(response);
//     console.log(projectId); // Ensure full post details are fetched
//   } catch (error) {
//     console.error("Error fetching project details:", error);
//   }
// };

//   // Retrieve user data from localStorage
//   useEffect(() => {
//     const userJson = localStorage.getItem("user");
//     if (userJson) {
//       try {
//         const userData = JSON.parse(userJson);
//         setUsername(userData.username);
//         setName(userData.name);
//         setUser(userData); // Set user from localStorage
//         setUserId(userData._id);
//         setFileName(userData.profilePhoto);
//         //console.log("User data from localStorage:", userId);
//       } catch (error) {
//         //console.error("Error parsing user data:", error);
//       }
//     }
//   }, []);

//   // Fetch user posts
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const userJson = localStorage.getItem("user");
//         const userData = userJson ? JSON.parse(userJson) : null;
//         const userId = userData ? userData._id : ""; // Get user ID from localStorage
//         const token = localStorage.getItem("token"); // or wherever you're storing it
//         const response = await axios.get(`${BASE_URL}/posts/my-posts`, {
//           headers: {
//             Authorization: `Bearer ${token}`, // Include the token here
//           },
//         });
//         // console.log("Fetched posts:", response.data); // Log fetched posts
//         setPosts(response.data); // Set posts state with fetched data
//         // Fetch follow count and following status
//         const followCountResponse = await followServices.getFollowCount(userId);
//         setFollowCount(followCountResponse);
//         //console.log("Follow Count:", followCountResponse);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };

//     fetchPosts();
//   }, []);

//   // Fetch saved posts
//   useEffect(() => {
//     const fetchSavedPosts = async () => {
//       const token = localStorage.getItem("token");
//       const userJson = localStorage.getItem("user");

//       if (userJson) {
//         try {
//           const user = JSON.parse(userJson);
//           const response = await axios.get(
//             `${BASE_URL}/users/${user._id}/saved-posts`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             }
//           );
//           setSavedPosts(response.data); // Set saved posts state
//         } catch (error) {
//           console.error("Error fetching saved posts:", error);
//         } finally {
//           setLoading(false); // Set loading to false after data is fetched
//         }
//       }
//     };

//     fetchSavedPosts();
//   }, []);

//   // Delete post handler
//   const deletePost = async (postId) => {
//     const token = localStorage.getItem("token");

//     try {
//       // Call your backend API to delete the post
//       await axios.delete(`${BASE_URL}/posts/posts/${postId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`, // Include the token here
//         },
//       });
//       // Update the state to remove the deleted post
//       setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
//     } catch (error) {
//       console.error("Error deleting post:", error);
//     }
//   };
//   // Upload profile photo handler
//   const handleProfilePhotoChange = (event) => {
//     setProfilePhoto(event.target.files[0]);
//   };

//   const uploadProfilePhoto = async () => {
//     const token = localStorage.getItem("token"); // Get token from localStorage
//     const formData = new FormData(); // Create FormData object
//     formData.append("file", profilePhoto); // Append the selected file

//     try {
//       const response = await axios.post(
//         `${BASE_URL}/user/upload-profile-photo`, // Your API endpoint
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // Set authorization header
//             "Content-Type": "multipart/form-data", // Set content type
//           },
//         }
//       );
//       // console.log("Profile photo uploaded:", response.data);
//       setUploadMessage("Profile photo uploaded successfully!"); // Set success message
//       setTimeout(() => setUploadMessage(""), 3000); // Clear message after 3 seconds
//       setIsUploadVisible((prev) => !prev);
//       if (response.status === 200) {
//         //console.log("Upload successful:", response.data);
//         // After a successful upload, fetch the updated user data
//         await fetchUserData(userId);
//       }
//     } catch (error) {
//       //console.error("Error uploading profile photo:", error);
//       setUploadMessage("Error uploading profile photo!"); // Set error message
//       setTimeout(() => setUploadMessage(""), 3000); // Clear message after 3 seconds
//     }
//   };
//   const fetchUserData = async (id) => {
//     try {
//       const response = await axios.get(`${BASE_URL}/user/${userId}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`, // If you use JWT for authentication
//         },
//       });

//       if (response.status === 200) {
//         const updatedUserData = response.data;
//         setUser(updatedUserData);
//         setUsername(updatedUserData.username);
//         setName(updatedUserData.name);
//         setFileName(updatedUserData.profilePhoto);
//         localStorage.setItem("user", JSON.stringify(updatedUserData)); // Update localStorage
//       }
      

//     } catch (error) {
//       console.error("Error fetching updated user data:", error);
//     }
//   };
//   const handleFollowToggle = async () => {
//     if (!user) return;

//     try {
//       if (isFollowing) {
//         await followServices.unfollowUser(user._id);
//         setFollowCount((prev) => ({ ...prev, followers: prev.followers - 1 }));
//         //createNotification(user._id, `{user.id} Unfollowed You`, "unfollow");
//       } else {
//         await followServices.followUser(user._id);
//         setFollowCount((prev) => ({ ...prev, followers: prev.followers + 1 }));
//         createNotification(
//           user._id,
//           `${thisUser.username} Followed You`,
//           "follow"
//         );
//         console.log(user);
//       }
//       setIsFollowing(!isFollowing);
//     } catch (error) {
//       console.error("Error updating follow status:", error);
//     }
//   };

//   const fetchFollowList = async (type) => {
//     try {
//       const response =
//         type === "followers"
//           ? await followServices.getFollowers(user._id)
//           : await followServices.getFollowing(user._id);

//       const followData =
//         type === "followers" ? response.followers : response.following;

//       //console.log("Fetched Data:", followData);

//       setFollowList(Array.isArray(followData) ? followData : []); // Ensure followList is always an array

//       setFollowType(type);
//       setShowFollowModal(true);
//     } catch (error) {
//       console.error(`Error fetching ${type} list:`, error);
//       setFollowList([]); // Fallback to empty array in case of error
//     }
//   };

// const toggleUploadVisibility = () => {
//   setIsUploadVisible((prev) => !prev); // Toggle visibility of upload section
// };
//   // Fallback to the authenticated user or placeholder user
//   const fallbackUser = {
//     name: "John Doe",
//     username: "johndoe123",
//     bio: "Full-Stack Developer | JavaScript Enthusiast | Open-source Contributor",
//     imageUrl: "https://via.placeholder.com/150",
//     followers: 230,
//     following: 180,
//   };
// //console.log(fileName);
//   const displayUser = authUser || user || fallbackUser;
//   const photoUrl = `https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/profile_photo%2F${userId}%2F${fileName}?alt=media`;
//  // console.log(displayUser);
// // console.log();
//   return (
//     <div className="max-h-full overflow-y-auto hide-scrollbar">
//       {/* Success/Error Message */}
//       {uploadMessage && (
//         <div
//           className={`slide-in-message bg-green-500 text-white p-2 rounded-md mt-4`}
//         >
//           {uploadMessage}
//         </div>
//       )}
//       <div className="dark">
//         <div className="bg-gray-900 min-h-screen p-6 flex flex-col items-center">
//           {/* Profile Header */}
//           <div className="w-full max-w-4xl bg-gray-800 shadow-lg rounded-lg p-6 flex flex-col items-center space-y-4">
//             <img
//               className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
//               src={photoUrl}
//               alt={displayUser.name}
//               onClick={toggleUploadVisibility}
//             />
//             {/* Upload Profile Photo Section */}
//             {isUploadVisible && ( // Conditionally render the upload section
//               <div className="mt-4">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleProfilePhotoChange}
//                   className="border border-gray-500 p-2 rounded-md"
//                 />
//                 <button
//                   onClick={uploadProfilePhoto}
//                   className="mt-2 bg-indigo-500 text-white px-4 py-2 rounded-md"
//                 >
//                   Upload Photo
//                 </button>
//               </div>
//             )}

//             <h2 className="text-2xl font-bold text-gray-100">
//               {displayUser.name}
//             </h2>
//             <p className="text-sm text-gray-400">@{displayUser.username}</p>
//             <p className="text-center text-gray-300">{displayUser.bio}</p>

//             {/* Stats Section */}
//             <div className="flex space-x-6 mt-4 cursor-pointer">
//               <div
//                 className="text-center"
//                 onClick={() => fetchFollowList("followers")}
//               >
//                 <h3 className="text-lg font-bold text-gray-100">
//                   {displayUser.followers}
//                 </h3>
//                 <p className="text-gray-400">
//                   Followers : {followCount.followersCount}
//                 </p>
//               </div>
//               <div
//                 className="text-center"
//                 onClick={() => fetchFollowList("following")}
//               >
//                 <h3 className="text-lg font-bold text-gray-100">
//                   {displayUser.following}
//                 </h3>
//                 <p className="text-gray-400">
//                   Following : {followCount.followingCount}
//                 </p>
//               </div>
//             </div>

//             {/* Tabs for Projects and Saved */}
//             <div className="flex space-x-4 mt-8">
//               <button
//                 onClick={() => setActiveTab("projects")}
//                 className={`px-4 py-2 rounded-md ${
//                   activeTab === "projects"
//                     ? "bg-indigo-500 text-white"
//                     : "bg-gray-700 text-gray-400"
//                 }`}
//               >
//                 Projects
//               </button>
//               <button
//                 onClick={() => setActiveTab("saved")}
//                 className={`px-4 py-2 rounded-md ${
//                   activeTab === "saved"
//                     ? "bg-indigo-500 text-white"
//                     : "bg-gray-700 text-gray-400"
//                 }`}
//               >
//                 Saved
//               </button>
//             </div>
//           </div>

//           {/* Dynamic Section based on Tab */}
//           <div className="w-full max-w-4xl mt-8">
//             {activeTab === "projects" && (
//               <>
//                 <h3 className="text-xl font-semibold text-gray-100 mb-4">
//                   Your Projects
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   {posts.length > 0 ? (
//                     posts.map((post) => (
//                       <div
//                         key={post._id}
//                         onClick={() => handleProjectClick(post)}
//                         className="bg-gray-800 shadow-md rounded-lg overflow-hidden"
//                       >
//                         {post.media.map((media) => {
//                           const mediaUrl = `https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${post.author._id}%2F${media.file_id}?alt=media`;
//                           return media.type === "image" ? (
//                             <img
//                               key={media._id}
//                               className="w-full h-48 object-cover"
//                               src={mediaUrl}
//                               alt={post.caption}
//                             />
//                           ) : media.type === "video" ? (
//                             <video
//                               key={media._id}
//                               className="w-full h-48 object-cover"
//                               src={mediaUrl}
//                               controls
//                             />
//                           ) : null; // In case of any other type
//                         })}
//                         <div className="p-4">
//                           <h4 className="text-lg font-semibold text-gray-100">
//                             {post.caption}
//                           </h4>
//                           <p className="text-gray-400 mt-2">
//                             {post.description}
//                           </p>
//                           {post.projectURL && (
//                             <a
//                               href={post.projectURL}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="text-indigo-400 hover:underline mt-4 inline-block"
//                             >
//                               View Project
//                             </a>
//                           )}
//                           {/* Updated Delete Button */}
//                           <button
//                             onClick={() => deletePost(post._id)}
//                             className="mt-4 bg-red-600 text-white hover:bg-red-700 transition duration-200 px-4 py-2 rounded-md"
//                           >
//                             Remove Project
//                           </button>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-gray-400">No projects found.</p>
//                   )}
//                   {showFollowModal && (
//                     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//                       <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md shadow-lg relative">
//                         <h3 className="text-lg font-semibold text-white">
//                           {followType === "followers"
//                             ? "Followers"
//                             : "Following"}
//                         </h3>
//                         <button
//                           className="absolute top-2 right-2 text-red-500 text-xl"
//                           onClick={() => setShowFollowModal(false)}
//                           aria-label="Close modal"
//                         >
//                           ✖
//                         </button>
//                         <ul className="mt-4 max-h-64 overflow-y-auto">
//                           {followList.length === 0 ? (
//                             <div className="text-center mt-4 text-gray-500">
//                               No {followType} found.
//                             </div>
//                           ) : (
//                             followList.map((person) => {
//                               const user =
//                                 followType === "followers"
//                                   ? person.followerId // Follower case
//                                   : person.userId; // Following case

//                               return (
//                                 <li
//                                   key={user?._id}
//                                   className="p-2 border-b border-gray-700 flex items-center space-x-3"
//                                 >
//                                   {/* Profile Image / Placeholder */}
//                                   <div className="relative w-10 h-10">
//                                     {user?.profilePhoto ? (
//                                       <img
//                                         src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/profile_photo%2F${user?._id}%2F${user?.profilePhoto}?alt=media`}
//                                         alt={`${user?.name}'s profile`}
//                                         className="w-10 h-10 rounded-full border-2 border-gray-200 shadow-lg object-cover"
//                                       />
//                                     ) : (
//                                       <div className="w-10 h-10 bg-gray-700 flex items-center justify-center rounded-full">
//                                         <span className="text-white text-sm font-medium">
//                                           {user?.name?.charAt(0)}
//                                         </span>
//                                       </div>
//                                     )}
//                                   </div>

//                                   {/* User Details */}
//                                   <div>
//                                     <p className="text-white font-medium">
//                                       {user?.name}
//                                     </p>
//                                     <p className="text-gray-400 text-sm">
//                                       @{user?.username}
//                                     </p>
//                                   </div>
//                                 </li>
//                               );
//                             })
//                           )}
//                         </ul>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </>
//             )}

//             {activeTab === "saved" && (
//               <>
//                 <h3 className="text-xl font-semibold text-gray-100 mb-4">
//                   Saved Projects
//                 </h3>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   {loading ? (
//                     <p className="text-center text-gray-400">Loading...</p>
//                   ) : savedPosts.length > 0 ? (
//                     savedPosts.map(
//                       ({ _id, postId }) =>
//                         postId && (
//                           <div
//                             key={_id}
//                             onClick={() => handleProjectClick(postId)}
//                             className="bg-gray-800 shadow-md rounded-lg overflow-hidden"
//                           >
//                             {/* Media Section */}
//                             {postId.media && postId.media.length > 0 && (
//                               <div className="w-full h-64 overflow-hidden">
//                                 {postId.media.map((mediaItem) =>
//                                   mediaItem.type === "video" ? (
//                                     <video
//                                       key={mediaItem.file_id}
//                                       className="w-full h-full object-cover"
//                                       controls
//                                     >
//                                       <source
//                                         src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${postId.author._id}%2F${mediaItem.file_id}?alt=media`}
//                                         type="video/mp4"
//                                       />
//                                     </video>
//                                   ) : (
//                                     <img
//                                       key={mediaItem.file_id}
//                                       className="w-full h-full object-cover"
//                                       src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${postId.author}%2F${mediaItem.file_id}?alt=media`}
//                                       alt={postId.caption}
//                                     />
//                                   )
//                                 )}
//                               </div>
//                             )}

//                             {/* Content Section */}
//                             <div className="p-4">
//                               <h4 className="text-lg font-semibold text-gray-100">
//                                 {postId.caption}
//                               </h4>
//                               <p className="text-gray-400 mt-2">
//                                 {postId.description}
//                               </p>
//                               {postId.projectURL && (
//                                 <a
//                                   href={postId.projectURL}
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                   className="text-indigo-400 hover:underline mt-4 inline-block"
//                                 >
//                                   View Project
//                                 </a>
//                               )}
//                             </div>
//                           </div>
//                         )
//                     )
//                   ) : (
//                     <p className="text-gray-400">No saved posts found.</p>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>
//           {selectedProject && (
//             <div
//               id="popup-overlay"
//               className="fixed inset-0 bg-black bg-opacity-50 flex backdrop-blur-md items-center justify-center z-50 transition-opacity duration-300 lg:pt-10"
//               onClick={() => setSelectedProject(null)} // Close modal when clicking outside
//             >
//               <div
//                 className="relative dark:bg-gray-900 p-4 rounded-lg shadow-lg w-full max-w-lg"
//                 onClick={(e) => e.stopPropagation()} // Prevent modal from closing when clicking inside
//               >
//                 <button
//                   className="absolute top-2 right-2 text-gray-400 hover:text-white"
//                   onClick={() => setSelectedProject(null)} // Close button
//                 >
//                   ✕
//                 </button>
//                 <ExtraPostCard post={selectedProject} />{" "}
//                 {/* Pass the selected project */}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;

import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import ExtraPostCard from "./ExtraPostCard";
import followServices from "../../lib/MongoDB/follow";
import {
  Upload,
  X,
  FolderOpen,
  Bookmark,
  Users,
  UserPlus,
  ExternalLink,
  Trash2,
  Image,
  Play,
  FileText,
} from "lucide-react";

const Profile = () => {
  const { user: authUser } = useAuth();
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [posts, setPosts] = useState([]);
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("projects");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [isUploadVisible, setIsUploadVisible] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [selectedProject, setSelectedProject] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_URL;
  const [followCount, setFollowCount] = useState({
    followers: 0,
    following: 0,
  });
  const [showFollowModal, setShowFollowModal] = useState(false);
  const [followList, setFollowList] = useState([]);
  const [followType, setFollowType] = useState("");

  const handleProjectClick = async (projectId) => {
    try {
      setSelectedProject(projectId);
      console.log(projectId);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      try {
        const userData = JSON.parse(userJson);
        setUsername(userData.username);
        setName(userData.name);
        setUser(userData);
        setUserId(userData._id);
        setFileName(userData.profilePhoto);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const userJson = localStorage.getItem("user");
        const userData = userJson ? JSON.parse(userJson) : null;
        const userId = userData ? userData._id : "";
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BASE_URL}/posts/my-posts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data);
        const followCountResponse = await followServices.getFollowCount(userId);
        setFollowCount(followCountResponse);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      const token = localStorage.getItem("token");
      const userJson = localStorage.getItem("user");

      if (userJson) {
        try {
          const user = JSON.parse(userJson);
          const response = await axios.get(
            `${BASE_URL}/users/${user._id}/saved-posts`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setSavedPosts(response.data);
        } catch (error) {
          console.error("Error fetching saved posts:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSavedPosts();
  }, []);

  const deletePost = async (postId) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`${BASE_URL}/posts/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleProfilePhotoChange = (event) => {
    setProfilePhoto(event.target.files[0]);
  };

  const uploadProfilePhoto = async () => {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("file", profilePhoto);

    try {
      const response = await axios.post(
        `${BASE_URL}/user/upload-profile-photo`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadMessage("Profile photo uploaded successfully!");
      setTimeout(() => setUploadMessage(""), 3000);
      setIsUploadVisible(false);
      if (response.status === 200) {
        await fetchUserData(userId);
      }
    } catch (error) {
      setUploadMessage("Error uploading profile photo!");
      setTimeout(() => setUploadMessage(""), 3000);
    }
  };

  const fetchUserData = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        const updatedUserData = response.data;
        setUser(updatedUserData);
        setUsername(updatedUserData.username);
        setName(updatedUserData.name);
        setFileName(updatedUserData.profilePhoto);
        localStorage.setItem("user", JSON.stringify(updatedUserData));
      }
    } catch (error) {
      console.error("Error fetching updated user data:", error);
    }
  };

  const fetchFollowList = async (type) => {
    try {
      const response =
        type === "followers"
          ? await followServices.getFollowers(user._id)
          : await followServices.getFollowing(user._id);

      const followData =
        type === "followers" ? response.followers : response.following;

      setFollowList(Array.isArray(followData) ? followData : []);
      setFollowType(type);
      setShowFollowModal(true);
    } catch (error) {
      console.error(`Error fetching ${type} list:`, error);
      setFollowList([]);
    }
  };

  const toggleUploadVisibility = () => {
    setIsUploadVisible((prev) => !prev);
  };

  const fallbackUser = {
    name: "John Doe",
    username: "johndoe123",
    bio: "Full-Stack Developer | JavaScript Enthusiast | Open-source Contributor",
    imageUrl: "https://via.placeholder.com/150",
    followers: 230,
    following: 180,
  };

  const displayUser = authUser || user || fallbackUser;
  const photoUrl = `https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/profile_photo%2F${userId}%2F${fileName}?alt=media`;

  return (
    <div className="max-h-full overflow-y-auto hide-scrollbar bg-[#060711]">
      {uploadMessage && (
        <div
          className={`slide-in-message bg-blue-600 text-white p-3 rounded-lg mt-4 mx-4`}
        >
          {uploadMessage}
        </div>
      )}

      <div className="min-h-screen p-6 flex flex-col items-center">
        {/* Profile Header */}
        <div className="w-full max-w-4xl bg-[#0a0f1f] rounded-xl p-8 flex flex-col items-center space-y-6 border border-gray-800">
          <div className="relative">
            <img
              className="w-32 h-32 rounded-full object-cover border-2 border-blue-600 cursor-pointer"
              src={photoUrl}
              alt={displayUser.name}
              onClick={toggleUploadVisibility}
            />
            {isUploadVisible && (
              <div className="absolute top-0 left-0 w-32 h-32 bg-black bg-opacity-70 rounded-full flex items-center justify-center">
                <Upload size={24} className="text-white" />
              </div>
            )}
          </div>

          {isUploadVisible && (
            <div className="flex flex-col items-center space-y-3">
              <label className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors">
                <Image size={18} />
                Choose Image
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePhotoChange}
                  className="hidden"
                />
              </label>
              <button
                onClick={uploadProfilePhoto}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Upload size={18} />
                Upload Photo
              </button>
            </div>
          )}

          <h2 className="text-2xl font-bold text-white">{displayUser.name}</h2>
          <p className="text-gray-400">@{displayUser.username}</p>
          <p className="text-center text-gray-300 max-w-md">
            {displayUser.bio}
          </p>

          {/* Stats Section */}
          <div className="flex space-x-8 mt-4">
            <div
              className="text-center cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => fetchFollowList("followers")}
            >
              <h3 className="text-lg font-bold text-white">
                {followCount.followersCount || 0}
              </h3>
              <p className="text-gray-400 flex items-center gap-1">
                <Users size={16} />
                Followers
              </p>
            </div>
            <div
              className="text-center cursor-pointer hover:text-blue-600 transition-colors"
              onClick={() => fetchFollowList("following")}
            >
              <h3 className="text-lg font-bold text-white">
                {followCount.followingCount || 0}
              </h3>
              <p className="text-gray-400 flex items-center gap-1">
                <UserPlus size={16} />
                Following
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-2 mt-6 bg-gray-900 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === "projects"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <FolderOpen size={18} />
              Projects
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === "saved"
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Bookmark size={18} />
              Saved
            </button>
          </div>
        </div>

        {/* Content Section - Compact Cards */}
        <div className="w-full max-w-6xl mt-8">
          {activeTab === "projects" && (
            <>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <FolderOpen size={20} />
                Your Projects ({posts.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {posts.length > 0 ? (
                  posts.map((post) => (
                    <div
                      key={post._id}
                      onClick={() => handleProjectClick(post)}
                      className="bg-[#0a0f1f] rounded-lg overflow-hidden border border-gray-800 hover:border-blue-600 transition-all duration-200 cursor-pointer group"
                    >
                      {/* Media Thumbnail */}
                      <div className="relative h-32 bg-gray-900 overflow-hidden">
                        {post.media.length > 0 ? (
                          post.media.map((media) => {
                            const mediaUrl = `https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${post.author._id}%2F${media.file_id}?alt=media`;
                            return media.type === "image" ? (
                              <img
                                key={media._id}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                src={mediaUrl}
                                alt={post.caption}
                              />
                            ) : media.type === "video" ? (
                              <div className="relative w-full h-full">
                                <video
                                  key={media._id}
                                  className="w-full h-full object-cover"
                                  src={mediaUrl}
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <Play
                                    size={24}
                                    className="text-white opacity-70"
                                  />
                                </div>
                              </div>
                            ) : null;
                          })
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-800">
                            <FileText size={32} className="text-gray-600" />
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-3">
                        <h4 className="text-sm font-semibold text-white mb-1 line-clamp-1">
                          {post.caption}
                        </h4>
                        <p className="text-gray-400 text-xs mb-3 line-clamp-2">
                          {post.description}
                        </p>

                        <div className="flex justify-between items-center">
                          {post.projectURL && (
                            <a
                              href={post.projectURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-blue-600 hover:text-blue-500 transition-colors text-xs"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ExternalLink size={12} />
                              View
                            </a>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deletePost(post._id);
                            }}
                            className="flex items-center gap-1 px-2 py-1 text-red-600 hover:text-red-500 transition-colors text-xs"
                          >
                            <Trash2 size={12} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <FolderOpen
                      size={48}
                      className="text-gray-600 mx-auto mb-4"
                    />
                    <p className="text-gray-400">No projects found.</p>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === "saved" && (
            <>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <Bookmark size={20} />
                Saved Projects ({savedPosts.length})
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {loading ? (
                  <div className="col-span-full text-center py-12">
                    <p className="text-gray-400">Loading saved projects...</p>
                  </div>
                ) : savedPosts.length > 0 ? (
                  savedPosts.map(
                    ({ _id, postId }) =>
                      postId && (
                        <div
                          key={_id}
                          onClick={() => handleProjectClick(postId)}
                          className="bg-[#0a0f1f] rounded-lg overflow-hidden border border-gray-800 hover:border-blue-600 transition-all duration-200 cursor-pointer group"
                        >
                          {/* Media Thumbnail */}
                          <div className="relative h-32 bg-gray-900 overflow-hidden">
                            {postId.media && postId.media.length > 0 ? (
                              postId.media.map((mediaItem) =>
                                mediaItem.type === "video" ? (
                                  <div className="relative w-full h-full">
                                    <video
                                      key={mediaItem.file_id}
                                      className="w-full h-full object-cover"
                                      src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${postId.author._id}%2F${mediaItem.file_id}?alt=media`}
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <Play
                                        size={24}
                                        className="text-white opacity-70"
                                      />
                                    </div>
                                  </div>
                                ) : (
                                  <img
                                    key={mediaItem.file_id}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                    src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${postId.author}%2F${mediaItem.file_id}?alt=media`}
                                    alt={postId.caption}
                                  />
                                )
                              )
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-800">
                                <FileText size={32} className="text-gray-600" />
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="p-3">
                            <h4 className="text-sm font-semibold text-white mb-1 line-clamp-1">
                              {postId.caption}
                            </h4>
                            <p className="text-gray-400 text-xs mb-3 line-clamp-2">
                              {postId.description}
                            </p>

                            {postId.projectURL && (
                              <a
                                href={postId.projectURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-blue-600 hover:text-blue-500 transition-colors text-xs"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <ExternalLink size={12} />
                                View Project
                              </a>
                            )}
                          </div>
                        </div>
                      )
                  )
                ) : (
                  <div className="col-span-full text-center py-12">
                    <Bookmark
                      size={48}
                      className="text-gray-600 mx-auto mb-4"
                    />
                    <p className="text-gray-400">No saved projects found.</p>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Follow Modal */}
        {showFollowModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#0a0f1f] p-6 rounded-xl w-full max-w-md border border-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">
                  {followType === "followers" ? "Followers" : "Following"}
                </h3>
                <button
                  className="text-gray-400 hover:text-white transition-colors"
                  onClick={() => setShowFollowModal(false)}
                >
                  <X size={20} />
                </button>
              </div>
              <ul className="max-h-64 overflow-y-auto">
                {followList.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    No {followType} found.
                  </div>
                ) : (
                  followList.map((person) => {
                    const user =
                      followType === "followers"
                        ? person.followerId
                        : person.userId;

                    return (
                      <li
                        key={user?._id}
                        className="p-3 border-b border-gray-800 flex items-center space-x-3 hover:bg-gray-900 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                          {user?.profilePhoto ? (
                            <img
                              src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/profile_photo%2F${user?._id}%2F${user?.profilePhoto}?alt=media`}
                              alt={`${user?.name}'s profile`}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-white text-sm font-medium">
                              {user?.name?.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div>
                          <p className="text-white font-medium">{user?.name}</p>
                          <p className="text-gray-400 text-sm">
                            @{user?.username}
                          </p>
                        </div>
                      </li>
                    );
                  })
                )}
              </ul>
            </div>
          </div>
        )}

        {/* Project Detail Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex backdrop-blur-md items-center justify-center z-50 transition-opacity duration-300 lg:pt-10"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="relative bg-[#0a0f1f] p-4 rounded-xl w-full max-w-lg border border-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
                onClick={() => setSelectedProject(null)}
              >
                <X size={20} />
              </button>
              <ExtraPostCard post={selectedProject} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;