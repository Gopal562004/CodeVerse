// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import PostCard from "./PostCard";
// import ExtraPostCard from "./ExtraPostCard";
// import followServices from "../../lib/MongoDB/follow";
// const OpponentProfile = () => {
//   const [user, setUser] = useState(null);
//   const [thisUser,setThisUser]= useState(null);
//   const [projects, setProjects] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [isFollowing, setIsFollowing] = useState(false);
//   const [followCount, setFollowCount] = useState({
//     followers: 0,
//     following: 0,
//   });
//   const [showFollowModal, setShowFollowModal] = useState(false);
//   const [followList, setFollowList] = useState([]);
//   const [followType, setFollowType] = useState("");

//   const location = useLocation();
//   const BASE_URL = import.meta.env.VITE_API_URL;
//   useEffect(() => {
//     const userJson = localStorage.getItem("user");
//     if (userJson) {
//       try {
//         const userData = JSON.parse(userJson);
//         setThisUser(userData);
//       } catch (error) {
//         console.error("Error parsing user data:", error);
//       }
//     }
//   }, []);
//   useEffect(() => {
//     const queryParams = new URLSearchParams(location.search);
//     const userId = queryParams.get("userId");

//     const fetchUserData = async () => {
//       try {
//         const userResponse = await axios.get(`${BASE_URL}/user/${userId}`);
//         setUser(userResponse.data);

//         const projectsResponse = await axios.get(
//           `${BASE_URL}/posts/user-posts/${userId}`
//         );
//         setProjects(projectsResponse.data);

//         const followCountResponse = await followServices.getFollowCount(userId);
//         setFollowCount(followCountResponse);
//         //console.log("Follow Count:", followCountResponse);

//         const followStatus = await followServices.isFollowingUser(userId);
//         setIsFollowing(followStatus.following);


//         // const response = await followServices.getFollowing(userId);
//         // console.log("Fetched Followers:", response.following); // This will log the correct value
//         // setFollowList(response.following); // Setting state
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userId) {
//       fetchUserData();
//     }
//   }, [location.search]);
//   // useEffect(() => {
//   //   console.log("Updated followList:", followList);
//   // }, [followList]);
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
//         createNotification(user._id, `${thisUser.username} Followed You`, "follow");
//         console.log(user)
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
// const handleProjectClick = async (projectId) => {
//   try {
//     // const response = await axios.get(`${BASE_URL}/posts/${projectId}`);
//     setSelectedProject(projectId); 
//     // console.log(response);
//     console.log(projectId);// Ensure full post details are fetched
//   } catch (error) {
//     console.error("Error fetching project details:", error);
//   }
// };
// const createNotification = async (userId, message, type) => {
//   try {
//     const response = await axios.post(`${BASE_URL}/notifications`, {
//       userId,
//       message,
//       type,
//     });
//     return response.data; // Return the newly created notification
//   } catch (error) {
//     console.error(
//       "Error creating notification:",
//       error.response?.data || error.message
//     );
//     throw error;
//   }
// };


//   if (loading) return <p className="text-center text-gray-400">Loading...</p>;
//   if (!user) return <p className="text-gray-400">User not found.</p>;
// //console.log(user)
//   return (
//     <div className="max-h-full overflow-y-auto hide-scrollbar">
//       <div className="max-w-2xl mx-auto my-10 p-6 rounded-lg shadow-lg bg-gray-800">
//         <div className="flex items-center mb-6">
//           <img
//             src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/profile_photo%2F${user._id}%2F${user.profilePhoto}?alt=media`}
//             alt={`${user.name}'s profile`}
//             className="w-32 h-32 rounded-full border-2 border-gray-200 mr-4 shadow-lg"
//           />
//           <div>
//             <h2 className="text-3xl font-bold text-gray-100">{user.name}</h2>
//             <p className="text-gray-500">@{user.username}</p>
//             <p className="text-gray-500">{user.email}</p>

//             <button
//               onClick={handleFollowToggle}
//               className={`mt-3 px-6 py-2 rounded-lg font-semibold text-white transition duration-300
//               ${
//                 isFollowing
//                   ? "bg-gray-700 hover:bg-gray-600 border border-gray-500 shadow-md"
//                   : "bg-blue-500 hover:bg-blue-400 border border-blue-400 shadow-md"
//               }
//               `}
//             >
//               {isFollowing ? "Unfollow" : "Follow"}
//             </button>
//           </div>
//         </div>

//         <div className="flex justify-between text-gray-400 mb-4">
//           <div
//             className="cursor-pointer"
//             onClick={() => fetchFollowList("followers")}
//           >
//             <h4 className="font-semibold">Followers:</h4>
//             <p className="text-xl">{followCount.followersCount}</p>
//           </div>
//           <div
//             className="cursor-pointer"
//             onClick={() => fetchFollowList("following")}
//           >
//             <h4 className="font-semibold">Following:</h4>
//             <p className="text-xl">{followCount.followingCount}</p>
//           </div>
//         </div>

//         <h5 className="mt-4 text-gray-500">
//           Joined: {new Date(user.createdAt).toLocaleDateString()}
//         </h5>

//         <div className="mt-6">
//           <h3 className="text-lg font-semibold text-gray-700">Projects:</h3>
//           {projects.length === 0 ? (
//             <p className="text-gray-500">No projects found.</p>
//           ) : (
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
//               {projects.map((project) => (
//                 <div
//                   key={project._id}
//                   className="p-4 rounded-lg shadow-md bg-gray-900 cursor-pointer"
//                   onClick={() => handleProjectClick(project)}
//                 >
//                   <h4 className="font-semibold text-gray-100">
//                     {project.caption}
//                   </h4>
//                   <p className="text-gray-400">{project.description}</p>

//                   {/* Media Section */}
//                   <div className="mt-2">
//                     {project.media && project.media.length > 0 ? (
//                       <>
//                         <img
//                           className="w-full h-48 object-cover rounded-lg"
//                           src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${project.author._id}%2F${project.media[0].file_id}?alt=media`}
//                           alt={project.caption}
//                         />
//                         {project.media.length > 1 && (
//                           <p className="text-blue-400 mt-2 cursor-pointer">
//                             View {project.media.length - 1} more image(s)
//                           </p>
//                         )}
//                       </>
//                     ) : (
//                       <p className="text-gray-500">No media available.</p>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//           {/* Popup PostCard */}
//           {/* Popup PostCard */}
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

//       {showFollowModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md shadow-lg relative">
//             <h3 className="text-lg font-semibold text-white">
//               {followType === "followers" ? "Followers" : "Following"}
//             </h3>
//             <button
//               className="absolute top-2 right-2 text-red-500 text-xl"
//               onClick={() => setShowFollowModal(false)}
//               aria-label="Close modal"
//             >
//               ✖
//             </button>
//             <ul className="mt-4 max-h-64 overflow-y-auto">
//               {followList.length === 0 ? (
//                 <div className="text-center mt-4 text-gray-500">
//                   No {followType} found.
//                 </div>
//               ) : (
//                 followList.map((person) => {
//                   const user =
//                     followType === "followers"
//                       ? person.followerId // Follower case
//                       : person.userId; // Following case

//                   return (
//                     <li
//                       key={user?._id}
//                       className="p-2 border-b border-gray-700 flex items-center space-x-3"
//                     >
//                       {/* Profile Image / Placeholder */}
//                       <div className="relative w-10 h-10">
//                         {user?.profilePhoto ? (
//                           <img
//                             src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/profile_photo%2F${user?._id}%2F${user?.profilePhoto}?alt=media`}
//                             alt={`${user?.name}'s profile`}
//                             className="w-10 h-10 rounded-full border-2 border-gray-200 shadow-lg object-cover"
//                           />
//                         ) : (
//                           <div className="w-10 h-10 bg-gray-700 flex items-center justify-center rounded-full">
//                             <span className="text-white text-sm font-medium">
//                               {user?.name?.charAt(0)}
//                             </span>
//                           </div>
//                         )}
//                       </div>

//                       {/* User Details */}
//                       <div>
//                         <p className="text-white font-medium">{user?.name}</p>
//                         <p className="text-gray-400 text-sm">
//                           @{user?.username}
//                         </p>
//                       </div>
//                     </li>
//                   );
//                 })
//               )}
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
//   //  console.log(selectedProject);
//   //  console.log(selectedProject);
// };

// export default OpponentProfile;
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ExtraPostCard from "./ExtraPostCard";
import followServices from "../../lib/MongoDB/follow";
import {
  User,
  Users,
  UserPlus,
  Calendar,
  X,
  Play,
  Image,
  FolderOpen,
} from "lucide-react";

const OpponentProfile = () => {
  const [user, setUser] = useState(null);
  const [thisUser, setThisUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followCount, setFollowCount] = useState({
    followers: 0,
    following: 0,
  });
  const [showFollowModal, setShowFollowModal] = useState(false);
  const [followList, setFollowList] = useState([]);
  const [followType, setFollowType] = useState("");

  const location = useLocation();
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      try {
        const userData = JSON.parse(userJson);
        setThisUser(userData);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const userId = queryParams.get("userId");

    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`${BASE_URL}/user/${userId}`);
        setUser(userResponse.data);

        const projectsResponse = await axios.get(
          `${BASE_URL}/posts/user-posts/${userId}`
        );
        setProjects(projectsResponse.data);

        const followCountResponse = await followServices.getFollowCount(userId);
        setFollowCount(followCountResponse);

        const followStatus = await followServices.isFollowingUser(userId);
        setIsFollowing(followStatus.following);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [location.search]);

  const handleFollowToggle = async () => {
    if (!user) return;

    try {
      if (isFollowing) {
        await followServices.unfollowUser(user._id);
        setFollowCount((prev) => ({ ...prev, followers: prev.followers - 1 }));
      } else {
        await followServices.followUser(user._id);
        setFollowCount((prev) => ({ ...prev, followers: prev.followers + 1 }));
        createNotification(
          user._id,
          `${thisUser.username} Followed You`,
          "follow"
        );
      }
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Error updating follow status:", error);
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

  const handleProjectClick = async (projectId) => {
    try {
      setSelectedProject(projectId);
    } catch (error) {
      console.error("Error fetching project details:", error);
    }
  };

  const createNotification = async (userId, message, type) => {
    try {
      const response = await axios.post(`${BASE_URL}/notifications`, {
        userId,
        message,
        type,
      });
      return response.data;
    } catch (error) {
      console.error(
        "Error creating notification:",
        error.response?.data || error.message
      );
      throw error;
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-400">Loading profile...</div>
      </div>
    );

  if (!user)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-400">User not found.</div>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#060711] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-[#0a0f1f] rounded-xl p-8 border border-gray-800 mb-8">
          <div className="flex items-start gap-6">
            {/* Profile Photo */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full bg-gray-800 border-2 border-blue-600 overflow-hidden">
                {user.profilePhoto ? (
                  <img
                    src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/profile_photo%2F${user._id}%2F${user.profilePhoto}?alt=media`}
                    alt={`${user.name}'s profile`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User size={48} className="text-gray-400" />
                  </div>
                )}
              </div>
            </div>

            {/* User Info */}
            <div className="flex-grow">
              <h2 className="text-2xl font-bold text-white mb-1">
                {user.name}
              </h2>
              <p className="text-gray-400 mb-2">@{user.username}</p>
              <p className="text-gray-400 text-sm mb-4">{user.email}</p>

              {/* Follow Button */}
              <button
                onClick={handleFollowToggle}
                className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                  isFollowing
                    ? "bg-gray-700 text-white hover:bg-gray-600 border border-gray-600"
                    : "bg-blue-600 text-white hover:bg-blue-700 border border-blue-600"
                }`}
              >
                {isFollowing ? "Unfollow" : "Follow"}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-6">
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
            <div className="text-center">
              <h3 className="text-lg font-bold text-white">
                {projects.length}
              </h3>
              <p className="text-gray-400 flex items-center gap-1">
                <FolderOpen size={16} />
                Projects
              </p>
            </div>
          </div>

          {/* Join Date */}
          <div className="flex items-center gap-2 mt-4 text-gray-400">
            <Calendar size={16} />
            <span>Joined {new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        {/* Projects Section */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <FolderOpen size={20} />
            Projects ({projects.length})
          </h3>

          {projects.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <FolderOpen size={48} className="mx-auto mb-4 opacity-50" />
              <p>No projects found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-[#0a0f1f] rounded-lg overflow-hidden border border-gray-800 hover:border-blue-600 transition-all duration-200 cursor-pointer group"
                  onClick={() => handleProjectClick(project)}
                >
                  {/* Media Preview */}
                  <div className="relative h-32 bg-gray-900 overflow-hidden">
                    {project.media && project.media.length > 0 ? (
                      project.media[0].type === "video" ? (
                        <div className="relative w-full h-full">
                          <video
                            className="w-full h-full object-cover"
                            src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${project.author._id}%2F${project.media[0].file_id}?alt=media`}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <Play size={24} className="text-white opacity-70" />
                          </div>
                        </div>
                      ) : (
                        <img
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                          src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${project.author._id}%2F${project.media[0].file_id}?alt=media`}
                          alt={project.caption}
                        />
                      )
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-800">
                        <Image size={32} className="text-gray-600" />
                      </div>
                    )}
                  </div>

                  {/* Project Info */}
                  <div className="p-3">
                    <h4 className="text-sm font-semibold text-white mb-1 line-clamp-1">
                      {project.caption}
                    </h4>
                    <p className="text-gray-400 text-xs line-clamp-2">
                      {project.description}
                    </p>
                    {project.media && project.media.length > 1 && (
                      <p className="text-blue-600 text-xs mt-2">
                        +{project.media.length - 1} more
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Project Detail Modal */}
        {selectedProject && (
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex backdrop-blur-md items-center justify-center z-50 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="relative bg-[#0a0f1f] rounded-xl w-full max-w-4xl border border-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
                onClick={() => setSelectedProject(null)}
              >
                <X size={24} />
              </button>
              <ExtraPostCard post={selectedProject} />
            </div>
          </div>
        )}

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
                        className="p-3 border-b border-gray-800 flex items-center space-x-3 hover:bg-[#060711] transition-colors"
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
      </div>
    </div>
  );
};

export default OpponentProfile;