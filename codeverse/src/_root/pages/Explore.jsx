// import React, { useEffect, useState } from "react";
// import { FiHeart, FiMessageCircle, FiSave } from "react-icons/fi";
// import { useGetRecentPost } from "../../lib/react-query/queriesAndMutations"; // Adjust the path as needed

// const Explore = () => {
//   const { data, isLoading } = useGetRecentPost();
//   const [authors, setAuthors] = useState({}); // Store authors by ID

//   useEffect(() => {
//     const fetchAuthors = async () => {
//       if (data && data.pages) {
//         const authorIds = data.pages.flatMap((page) =>
//           page.posts.map((post) => post.author)
//         );

//         // Create a unique set of author IDs
//         const uniqueAuthorIds = [...new Set(authorIds)];

//         try {
//           const authorPromises = uniqueAuthorIds.map((authorId) =>
//             fetch(`http://localhost:5000/user/${authorId}`).then((res) =>
//               res.json()
//             )
//           );
//           const authorData = await Promise.all(authorPromises);

//           // Create a mapping of author ID to author data
//           const authorsMap = {};
//           authorData.forEach((author) => {
//             authorsMap[author._id] = author; // Assuming each author has an _id field
//           });

//           setAuthors(authorsMap);
//         } catch (error) {
//           console.error("Error fetching user data:", error);
//         }
//       }
//     };

//     fetchAuthors();
//   }, [data]); // Re-fetch if data changes

//   return (
//     <div className="flex">
//       {/* Sidebar can be here if needed */}

//       <div className="min-h-screen py-10 px-4 dark:bg-gray-900 h-[80vh] hide-scrollbar">
//         {" "}
//         {/* Updated class name */}
//         <h1 className="text-2xl font-bold text-center mb-8 dark:text-white">
//           Explore Projects
//         </h1>
//         {isLoading ? (
//           <p className="text-center dark:text-gray-300">Loading posts...</p>
//         ) : (
//           <div className="columns-1 sm:columns-2 lg:columns-3 gap-2 space-y-4">
//             {data.pages.map((page) =>
//               page.posts.map((post) => (
//                 <div
//                   key={post._id}
//                   className="break-inside-avoid border border-gray-800 dark:border-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:text-gray-200"
//                 >
//                   {/* User Info Header */}
//                   <div className="flex items-center mb-4">
//                     {authors[post.author]?.profilePhoto ? (
//                       <img
//                         src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${
//                           post.author
//                         }%2F${authors[post.author].profilePhoto}?alt=media`}
//                         alt={`${authors[post.author]?.username}'s profile`}
//                         className="w-10 h-10 rounded-full object-cover mr-3"
//                       />
//                     ) : (
//                       <div className="w-10 h-10 rounded-full bg-gray-400 mr-3"></div>
//                     )}
//                     <p className="font-semibold text-lg text-gray-500 dark:text-white">
//                       {authors[post.author]?.username || "Loading..."}
//                     </p>
//                   </div>

//                   {/* Media Preview */}
//                   <div className="w-full h-auto bg-gray-200 rounded-lg overflow-hidden mb-4 dark:bg-gray-700">
//                     {post.media && post.media.length > 0 ? (
//                       post.media[0].type === "video" ? ( // Check if the media is a video
//                         <video controls className="w-full h-full object-cover">
//                           <source
//                             src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${post.author}%2F${post.media[0].file_id}?alt=media`}
//                             type="video/mp4"
//                           />
//                           Your browser does not support the video tag.
//                         </video>
//                       ) : (
//                         <img
//                           src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${post.author}%2F${post.media[0].file_id}?alt=media`}
//                           alt="Project Preview"
//                           className="w-full h-full object-cover"
//                         />
//                       )
//                     ) : (
//                       <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
//                         No media available
//                       </div>
//                     )}
//                   </div>

//                   {/* Post Details */}
//                   <h3 className="text-xl font-semibold text-gray-500 dark:text-white">
//                     {post.caption}
//                   </h3>
//                   <p className="text-sm text-gray-600 mt-2 dark:text-gray-300">
//                     {post.description}
//                   </p>

//                   {/* Tech Stack Tags */}
//                   <div className="mt-4">
//                     {post.techStack?.map((tech, index) => (
//                       <span
//                         key={index}
//                         className="inline-block bg-blue-500 text-white text-xs font-medium mr-2 mb-2 px-2 py-1 rounded-full dark:bg-blue-400"
//                       >
//                         {tech}
//                       </span>
//                     ))}
//                   </div>

//                   {/* Action Buttons */}
//                   {/* <div className="flex justify-between items-center mt-4">
//                     <FiHeart className="text-xl cursor-pointer hover:text-pink-500 dark:hover:text-pink-400" />
//                     <FiMessageCircle className="text-xl cursor-pointer hover:text-blue-400 dark:hover:text-blue-300" />
//                     <FiSave className="text-xl cursor-pointer hover:text-yellow-400 dark:hover:text-yellow-300" />
//                   </div> */}
//                 </div>
//               ))
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Explore;
////////////////////////////////////
import React, { useEffect, useState, useRef } from "react";
import {
  useGetRecentPost,
  useGetPostsExplore,
} from "../../lib/react-query/queriesAndMutations"; // Adjust the path as needed
import ExtraPostCard from "./ExtraPostCard"; // Import the PostCard component
import PostCard from "./PostCard";
const Explore = () => {
  const { data, isLoading } = useGetPostsExplore();
  const [authors, setAuthors] = useState({});
  const [selectedPost, setSelectedPost] = useState(null); // State to track the selected post
  const modalRef = useRef(null); // Ref for the modal
  const BASE_URL = import.meta.env.VITE_API_URL; // Replace with your Render app's URL

  useEffect(() => {
    const fetchAuthors = async () => {
      if (data && data.pages) {
        const authorIds = data.pages.flatMap((page) =>
          page.posts.map((post) => post.author._id)
        );

        const uniqueAuthorIds = [...new Set(authorIds)];

        try {
          const authorPromises = uniqueAuthorIds.map((authorId) =>
            fetch(`${BASE_URL}/user/${authorId}`).then((res) => res.json())
          );
          const authorData = await Promise.all(authorPromises);
          const authorsMap = {};
          authorData.forEach((author) => {
            authorsMap[author._id] = author;
          });
          setAuthors(authorsMap);
          console.log(data);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchAuthors();
  }, [data]);

  const handlePostClick = (post) => {
    setSelectedPost(post); // Set the selected post for the modal
  };

  const handleCloseModal = () => {
    setSelectedPost(null); // Close the modal
  };

  // Close modal if clicking outside of it
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (selectedPost) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectedPost]);

  return (
    <div className="flex">
      <div className="min-h-screen py-10 px-4 dark:bg-gray-900 h-[80vh] hide-scrollbar pb-32">
        <h1 className="text-2xl font-bold text-center mb-8 dark:text-white">
          Explore Projects
        </h1>
        {isLoading ? (
          <p className="text-center dark:text-gray-300">Loading posts...</p>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-2 space-y-4 sm:pb-40">
            {data.pages.map((page, pageIndex) =>
              page.posts.map((post, postIndex) => {
                const isLastPost =
                  pageIndex === data.pages.length - 1 &&
                  postIndex === page.posts.length - 1;

                return (
                  <div
                    key={post._id}
                    className={`break-inside-avoid border border-gray-800 dark:border-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:text-gray-200 ${
                      isLastPost ? "mb-16 sm:mb-32" : ""
                    }`}
                    onClick={() => handlePostClick(post)} // Handle post click
                  >
                    {/* User Info Header */}
                    <div className="flex items-center mb-4">
                      {post.author?.profilePhoto ? (
                        <img
                          src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${post.author._id}%2F${post.author.profilePhoto}?alt=media`}
                          alt={`${post.author.username}'s profile`}
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-gray-400 mr-3"></div>
                      )}
                      <p className="font-semibold text-lg text-gray-500 dark:text-white">
                        {post.author.username || "Loading..."}
                      </p>
                    </div>

                    {/* Media Preview */}
                    <div className="w-full h-auto bg-gray-200 rounded-lg overflow-hidden mb-4 dark:bg-gray-700">
                      {post.media && post.media.length > 0 ? (
                        post.media[0].type === "video" ? (
                          <video
                            controls
                            className="w-full h-full object-cover"
                          >
                            <source
                              src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${post.author._id}%2F${post.media[0].file_id}?alt=media`}
                              type="video/mp4"
                            />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <img
                            src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${post.author._id}%2F${post.media[0].file_id}?alt=media`}
                            alt="Project Preview"
                            className="w-full h-full object-cover"
                          />
                        )
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
                          No media available
                        </div>
                      )}
                    </div>

                    {/* Post Details */}
                    <h3 className="text-xl font-semibold text-gray-500 dark:text-white">
                      {post.caption}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2 dark:text-gray-300">
                      {post.description}
                    </p>

                    {/* Tech Stack Tags */}
                    <div className="mt-4">
                      {post.techStack?.map((tech, index) => (
                        <span
                          key={index}
                          className="inline-block bg-blue-500 text-white text-xs font-medium mr-2 mb-2 px-2 py-1 rounded-full dark:bg-blue-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
          <div
            ref={modalRef}
            className="rounded-lg shadow-lg p-6 max-w-lg w-full dark:bg-gray-800"
          >
            {/* Render ExtraPostCard on large screens, PostCard on smaller screens */}
            <div className="hidden lg:block">
              <ExtraPostCard
                post={selectedPost}
                onClose={handleCloseModal}
                className="dark:bg-gray-800"
              />
            </div>
            <div className="block lg:hidden">
              <PostCard
                post={selectedPost}
                onClose={handleCloseModal}
                className="dark:bg-gray-800"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Explore;
