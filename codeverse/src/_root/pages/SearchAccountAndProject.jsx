// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const SearchAccountAndProject = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const navigate = useNavigate();
//   const BASE_URL = import.meta.env.VITE_API_URL;

//   useEffect(() => {
//     const delayDebounce = setTimeout(() => {
//       if (searchTerm.trim() === "") {
//         setResults([]);
//         setShowDropdown(false);
//         return;
//       }

//       const fetchSuggestions = async () => {
//         setLoading(true);
//         try {
//           let response;
//           if (searchTerm.startsWith("#")) {
//             response = await axios.get(
//               `${BASE_URL}/posts/search-post?searchTerm=${encodeURIComponent(
//                 searchTerm.substring(1)
//               )}`
//             );
//           } else {
//             response = await axios.post(
//               `${BASE_URL}/user/search`,
//               { query: searchTerm },
//               {
//                 headers: {
//                   Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//               }
//             );
//           }

//           setResults(response.data.slice(0, 10));
//           setShowDropdown(true);
//         } catch (err) {
//           console.error("Live search error:", err);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchSuggestions();
//     }, 300); // debounce time

//     return () => clearTimeout(delayDebounce);
//   }, [searchTerm]);

//   const handleChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   const handleProfileClick = (userId) => {
//     navigate(`/opponent-profile?userId=${userId}`);
//     setShowDropdown(false);
//   };

//   return (
//     <div className="relative flex flex-col items-center p-4 rounded-lg shadow-md w-full max-w-md mx-auto">
//       <input
//         type="text"
//         placeholder="Search users or #project"
//         value={searchTerm}
//         onChange={handleChange}
//         className="w-full px-4 py-2 rounded-lg text-white bg-gray-700 border border-gray-600 focus:outline-none focus:ring focus:ring-indigo-500"
//       />

//       {/* 🔽 Live Suggestion Dropdown */}
//       {showDropdown && results.length > 0 && (
//         <div className="absolute top-full mt-1 w-full bg-gray-800 dark:bg-gray-800 border border-gray-600 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
//           {results.map((item, index) => (
//             <div
//               key={index}
//               onClick={() => item.username && handleProfileClick(item._id)}
//               className="p-2 hover:bg-gray-500 dark:hover:bg-gray-700 flex items-center gap-3 cursor-pointer"
//             >
//               {item.username ? (
//                 <>
//                   <img
//                     src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${item._id}%2F${item.profilePhoto}?alt=media`}
//                     alt="avatar"
//                     className="w-8 h-8 rounded-full object-cover"
//                   />
//                   <div>
//                     <p className="text-sm text-white dark:text-gray-200 font-semibold">
//                       {item.name}
//                     </p>
//                     <p className="text-xs text-gray-200 dark:text-gray-400">
//                       @{item.username}
//                     </p>
//                   </div>
//                 </>
//               ) : (
//                 <div>
//                   <p className="text-sm font-semibold text-gray-500 dark:text-gray-100">
//                     {item.caption}
//                   </p>
//                   <p className="text-xs text-gray-500">
//                     {item.description?.slice(0, 50)}...
//                   </p>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default SearchAccountAndProject;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Search, User, Hash, Image } from "lucide-react";

const SearchAccountAndProject = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim() === "") {
        setResults([]);
        setShowDropdown(false);
        return;
      }

      const fetchSuggestions = async () => {
        setLoading(true);
        try {
          let response;
          if (searchTerm.startsWith("#")) {
            response = await axios.get(
              `${BASE_URL}/posts/search-post?searchTerm=${encodeURIComponent(
                searchTerm.substring(1)
              )}`
            );
          } else {
            response = await axios.post(
              `${BASE_URL}/user/search`,
              { query: searchTerm },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
          }

          setResults(response.data.slice(0, 10));
          setShowDropdown(true);
        } catch (err) {
          console.error("Live search error:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchSuggestions();
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleProfileClick = (userId) => {
    navigate(`/opponent-profile?userId=${userId}`);
    setShowDropdown(false);
    setSearchTerm("");
  };

  const handlePostClick = (post) => {
    // You might want to navigate to post detail or show in modal
    console.log("Post clicked:", post);
    setShowDropdown(false);
    setSearchTerm("");
  };

  return (
    <div className="flex justify-center items-center w-full">
      <div className="relative w-full max-w-md">
        {/* Search Input */}
        <div className="relative m-10">
          <Search
            size={20}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search users or #projects"
            value={searchTerm}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#0a0f1f] border border-gray-800 text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none transition-colors"
          />
        </div>

        {/* Loading Indicator */}
        {loading && (
          <div className="absolute top-full mt-1 w-full bg-[#0a0f1f] border border-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-center text-gray-400">
              <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mr-2" />
              Searching...
            </div>
          </div>
        )}

        {/* Search Results Dropdown */}
        {showDropdown && results.length > 0 && (
          <div className="absolute top-full mt-1 w-full bg-[#0a0f1f] border border-gray-800 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
            {results.map((item, index) => (
              <div
                key={index}
                onClick={() =>
                  item.username
                    ? handleProfileClick(item._id)
                    : handlePostClick(item)
                }
                className="p-3 hover:bg-[#060711] border-b border-gray-800 last:border-b-0 cursor-pointer transition-colors"
              >
                {item.username ? (
                  // User Result
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 overflow-hidden flex-shrink-0">
                      {item.profilePhoto ? (
                        <img
                          src={`https://firebasestorage.googleapis.com/v0/b/codeverse-3a59b.appspot.com/o/user_post_upload%2F${item._id}%2F${item.profilePhoto}?alt=media`}
                          alt="avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User size={18} className="text-gray-400" />
                        </div>
                      )}
                    </div>
                    <div className="flex-grow min-w-0">
                      <p className="text-white font-medium text-sm truncate">
                        {item.name}
                      </p>
                      <p className="text-gray-400 text-xs truncate">
                        @{item.username}
                      </p>
                    </div>
                    <User size={16} className="text-gray-500 flex-shrink-0" />
                  </div>
                ) : (
                  // Post Result
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded bg-gray-800 border border-gray-700 overflow-hidden flex-shrink-0 flex items-center justify-center">
                      <Hash size={18} className="text-blue-600" />
                    </div>
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Hash size={14} className="text-blue-600" />
                        <p className="text-white font-medium text-sm truncate">
                          {item.caption}
                        </p>
                      </div>
                      <p className="text-gray-400 text-xs line-clamp-2">
                        {item.description}
                      </p>
                      {item.techStack && item.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {item.techStack.slice(0, 2).map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                          {item.techStack.length > 2 && (
                            <span className="inline-block bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
                              +{item.techStack.length - 2}
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {showDropdown &&
          !loading &&
          results.length === 0 &&
          searchTerm.trim() !== "" && (
            <div className="absolute top-full mt-1 w-full bg-[#0a0f1f] border border-gray-800 rounded-lg p-4">
              <div className="text-center text-gray-400">
                <Search size={24} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">No results found for "{searchTerm}"</p>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

export default SearchAccountAndProject;