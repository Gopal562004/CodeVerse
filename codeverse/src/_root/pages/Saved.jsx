import React, { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "./PostCard"; // Import PostCard component
import ExtraPostCard from "./ExtraPostCard";

const Saved = () => {
  const [savedPosts, setSavedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchSavedPosts = async () => {
      const token = localStorage.getItem("token");
      const userJson = localStorage.getItem("user");

      if (!token) {
        setError("No authentication token found.");
        setLoading(false);
        return;
      }

      let userId = "";
      if (userJson) {
        try {
          const user = JSON.parse(userJson);
          userId = user._id;
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }

      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${BASE_URL}/users/${userId}/saved-posts`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setSavedPosts(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching saved posts:", error);
        setError(
          error.response
            ? error.response.data.message
            : "Failed to load saved posts."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchSavedPosts();
  }, []);

  const unsavePost = async (postId) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError("No authentication token found.");
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/posts/${postId}/unsave`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSavedPosts((prevPosts) =>
        prevPosts.filter((post) => post.postId && post.postId._id !== postId)
      );
    } catch (error) {
      console.error("Error unsaving post:", error);
      setError(
        error.response
          ? error.response.data.message
          : "Failed to unsave the post."
      );
    }
  };

  // Handle closing the popup when clicking outside
  const closePopup = (e) => {
    if (e.target.id === "popup-overlay") {
      setSelectedPost(null);
    }
  };

  // Handle closing with Esc key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedPost(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8 h-full mb-28 lg:pb-24 bg-black">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Your Saved Posts
      </h1>
      <div className="h-full overflow-hidden">
        <div className="h-full overflow-y-auto scrollbar-hidden">
          {savedPosts.length > 0 ? (
            savedPosts.map(
              ({ _id, postId }) =>
                postId && (
                  <div
                    key={_id}
                    className="rounded-lg shadow-md flex flex-row p-4 transition-transform transform hover:scale-105 border border-gray-800 dark:border-gray-700 cursor-pointer"
                    onClick={() => setSelectedPost(postId)} // Open PostCard popup
                  >
                    <div className="flex-shrink-0 w-48 h-48 overflow-hidden rounded-lg">
                      {postId.media?.length > 0 &&
                        postId.media.map((mediaItem) =>
                          mediaItem.type === "video" ? (
                            <video
                              key={mediaItem.file_id}
                              className="w-full h-full object-cover"
                              controls
                            >
                              <source
                                src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${postId.author}%2F${mediaItem.file_id}?alt=media`}
                                type="video/mp4"
                              />
                            </video>
                          ) : (
                            <img
                              key={mediaItem.file_id}
                              src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${postId.author}%2F${mediaItem.file_id}?alt=media`}
                              alt={postId.caption}
                              className="w-full h-full object-cover"
                            />
                          )
                        )}
                    </div>
                    <div className="ml-4 flex flex-col justify-between">
                      <h2 className="text-lg font-bold mt-2 text-white">
                        {postId.caption}
                      </h2>
                      <p className="text-gray-400 mt-2">{postId.description}</p>
                      {postId.projectURL && (
                        <a
                          href={postId.projectURL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:underline mt-2"
                        >
                          View Project
                        </a>
                      )}
                      <div className="flex justify-between items-center mt-4">
                        <button className="text-blue-500 hover:underline">
                          Read More
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            unsavePost(postId._id);
                          }}
                          className="text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                )
            )
          ) : (
            <div className="text-center text-gray-500">
              No saved posts found.
            </div>
          )}
        </div>
      </div>

      {/* Popup PostCard */}
      {selectedPost && (
        <div
          id="popup-overlay"
          className="fixed inset-0 bg-black bg-opacity-50 flex backdrop-blur-md items-center justify-center z-50 transition-opacity duration-300 lg:pt-10 "
          onClick={closePopup}
        >
          <div
            className="relative dark:bg-gray-900 p-4 rounded-lg shadow-lg w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
              onClick={() => setSelectedPost(null)}
            >
              ✕
            </button>
            <ExtraPostCard post={selectedPost} unsavePost={unsavePost} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Saved;
