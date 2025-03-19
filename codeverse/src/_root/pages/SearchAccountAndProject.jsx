import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SearchAccountAndProject = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;

  // Function to handle search
  const handleSearch = async () => {
    if (!searchTerm) return;
    setLoading(true);

    try {
      let response;
      // Determine whether to search for users or posts
      if (searchTerm.startsWith("#")) {
        // Search for posts
        response = await axios.get(
          `${BASE_URL}/posts/search-post?searchTerm=${encodeURIComponent(
            searchTerm.substring(1)
          )}`
        );
      } else {
        // Search for users
        response = await axios.post(
          `${BASE_URL}/user/search`,
          { query: searchTerm },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with actual token
            },
          }
        );
      }

      setResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error during search:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle Enter key press
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // Navigate to opponent profile
  const handleProfileClick = (userId) => {
    navigate(`/opponent-profile?userId=${userId}`);
  };

  return (
    <div className="flex flex-col items-center p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-100 mb-4">
        Search Developers and Projects
      </h2>
      <div className="flex space-x-2 w-full max-w-md">
        <input
          type="text"
          placeholder="Search developers or #projectname / #tag"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="flex-grow px-4 py-2 rounded-lg text-white bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-indigo-500"
        />
        <button
          onClick={handleSearch}
          className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition duration-200"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Search Results - Instagram style grid */}
      {results.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4 w-full max-w-4xl overflow-y-auto max-h-[500px]">
          {results.map((item, index) => (
            <div
              key={index}
              onClick={() => item.username && handleProfileClick(item._id)}
              className="bg-gray-800 rounded-lg p-4 flex flex-col items-center shadow-md hover:shadow-lg transition-shadow duration-200 cursor-pointer"
            >
              {item.username ? ( // User profile
                <>
                  <img
                    src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${item._id}%2F${item.profilePhoto}?alt=media`}
                    alt={item.username}
                    className="rounded-full object-cover w-[100px]"
                  />
                  <h3 className="text-lg font-semibold text-gray-100">
                    {item.name}
                  </h3>
                  <p className="text-gray-400">@{item.username}</p>
                </>
              ) : (
                // Project details
                <>
                  <h3 className="text-lg font-semibold text-gray-100">
                    {item.caption}
                  </h3>
                  <p className="text-gray-400">{item.description}</p>
                </>
              )}

              {/* Follow Button for Users */}
              {item.username && (
                <button className="mt-4 bg-indigo-500 text-white px-4 py-1 rounded-full hover:bg-indigo-600 transition duration-200">
                  Follow
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* No Results Found */}
      {results.length === 0 && searchTerm && !loading && (
        <p className="text-gray-400 mt-4">
          No results found for "{searchTerm}".
        </p>
      )}
    </div>
  );
};

export default SearchAccountAndProject;
