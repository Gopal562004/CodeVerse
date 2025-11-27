// import React, { useState } from "react";
// import { useAuth, INITIAL_USER } from "../../context/AuthContext";
// import { useCreatePostMutation } from "../../lib/react-query/createPostMutation";
// import {
//   FiPlusSquare,
//   FiImage,
//   FiVideo,
//   FiCode,
//   FiTag,
//   FiList,
//   FiXCircle,
// } from "react-icons/fi";

// const CreatePost = () => {
//   const { user, isAuthenticated } = useAuth();
//   const [selectedFiles, setSelectedFiles] = useState([]);
//   const [caption, setCaption] = useState("");
//   const [description, setDescription] = useState("");
//   const [projectURL, setProjectURL] = useState("");
//   const [codeSnippets, setCodeSnippets] = useState("");
//   const [location, setLocation] = useState("");
//   const [tags, setTags] = useState("");
//   const [techStack, setTechStack] = useState("");
//   const [successMessage, setSuccessMessage] = useState(""); // Add state for success message

//   const {
//     mutate: createPost,
//     isLoading,
//     error,
//     reset,
//   } = useCreatePostMutation();

  
//   const handleFileChange = (event) => {
//     const files = Array.from(event.target.files);
//     const validFiles = files.filter((file) => file.size < 25 * 1024 * 1024);
//     if (validFiles.length !== files.length) {
//       alert("file were too large and have been ignored.");
//     }
//     setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);
//   };

//   const handleDrop = (event) => {
//     event.preventDefault();
//     const files = Array.from(event.dataTransfer.files);
//     const validFiles = files.filter((file) => file.size < 25 * 1024 * 1024);
//     if (validFiles.length !== files.length) {
//       alert("Some files were too large and have been ignored.");
//     }
//     setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);
//   };

//   const handleDragOver = (event) => {
//     event.preventDefault();
//   };
//   const handleRemoveFile = (index) => {
//     setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
//   };

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const post = {
//       caption,
//       description,
//       projectURL,
//       codeSnippets,
//       location,
//       tags: tags.split(",").map((tag) => tag.trim()),
//       techStack: techStack.split(",").map((stack) => stack.trim()),
//       files: selectedFiles,
//       author: user?.id || INITIAL_USER.id,
//     };
//     createPost(post, {
//       onSuccess: () => {
//         setCaption("");
//         setDescription("");
//         setProjectURL("");
//         setCodeSnippets("");
//         setLocation("");
//         setTags("");
//         setTechStack("");
//         setSelectedFiles([]);
//         setSuccessMessage("Post created successfully!"); // Set success message
//         reset(); // Optionally reset the mutation state
//       },
//       onError: (err) => {
//         console.error("Error creating post:", err);
//         setSuccessMessage(""); // Clear success message if error occurs
//       },
//     });
//   };
//   return (
//     <div className="flex h-screen overflow-hidden bg-gray-900 text-white">
//       <div className="flex-1 overflow-auto scrollbar-hide p-4">
//         <div className="max-w-lg mx-auto w-full mb-20">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-lg font-semibold">Create Project Post</h2>
//           </div>
//           <div className="space-y-4">
//             <textarea
//               className="w-full p-2 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-gray-600"
//               placeholder="Project Caption"
//               rows="2"
//               value={caption}
//               onChange={(e) => setCaption(e.target.value)}
//             ></textarea>

//             <textarea
//               className="w-full p-2 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-gray-600"
//               placeholder="Project Description"
//               rows="4"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             ></textarea>

//             <div
//               className="p-4 bg-gray-800 rounded-md border border-dashed border-gray-600 text-center"
//               onDrop={handleDrop}
//               onDragOver={handleDragOver}
//             >
//               <div className="flex justify-center space-x-4 mb-4">
//                 <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
//                   <FiImage className="w-8 h-8 text-gray-400" />
//                 </div>
//                 <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
//                   <FiVideo className="w-8 h-8 text-gray-400" />
//                 </div>
//                 <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
//                   <FiCode className="w-8 h-8 text-gray-400" />
//                 </div>
//               </div>
//               <button
//                 className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition"
//                 onClick={() => document.getElementById("fileInput").click()}
//               >
//                 Select Files
//               </button>
//               <input
//                 id="fileInput"
//                 type="file"
//                 multiple
//                 className="hidden"
//                 onChange={handleFileChange}
//               />
//               <div className="mt-4 grid grid-cols-3 gap-2">
//                 {selectedFiles.map((file, index) => (
//                   <div key={index} className="relative">
//                     {file.type.startsWith("image/") && (
//                       <img
//                         src={URL.createObjectURL(file)}
//                         alt={`preview ${index}`}
//                         className="w-full h-32 object-cover rounded-md"
//                       />
//                     )}
//                     {file.type.startsWith("video/") && (
//                       <video
//                         src={URL.createObjectURL(file)}
//                         className="w-full h-32 object-cover rounded-md"
//                         controls
//                         alt={`preview ${index}`}
//                       />
//                     )}
//                     <button
//                       className="absolute top-0 right-0 mt-1 mr-1 bg-slate-800 rounded-full"
//                       onClick={() => handleRemoveFile(index)}
//                     >
//                       <FiXCircle className="w-6 h-6 text-red-600" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <input
//               type="text"
//               placeholder="Project URL (GitHub repository)"
//               className="w-full p-2 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-gray-600"
//               value={projectURL}
//               onChange={(e) => setProjectURL(e.target.value)}
//             />

//             <textarea
//               className="w-full p-2 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-gray-600"
//               placeholder="Code Snippets"
//               rows="6"
//               value={codeSnippets}
//               onChange={(e) => setCodeSnippets(e.target.value)}
//             ></textarea>

//             <input
//               type="text"
//               placeholder="Add Location"
//               className="w-full p-2 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-gray-600"
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//             />

//             <div className="flex items-center space-x-2">
//               <FiTag className="w-6 h-6 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Tags (comma separated)"
//                 className="w-full p-2 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-gray-600"
//                 value={tags}
//                 onChange={(e) => setTags(e.target.value)}
//               />
//             </div>

//             <div className="flex items-center space-x-2">
//               <FiList className="w-6 h-6 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Tech Stack (comma separated)"
//                 className="w-full p-2 bg-gray-800 rounded-md border border-gray-700 focus:outline-none focus:border-gray-600"
//                 value={techStack}
//                 onChange={(e) => setTechStack(e.target.value)}
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full py-2 bg-blue-600 rounded-md text-white hover:bg-blue-700 transition"
//               onClick={handleSubmit}
//               disabled={isLoading}
//             >
//               {isLoading ? "Posting..." : "Create Post"}
//             </button>

//             {error && (
//               <div className="text-red-600 mt-2">
//                 {error.message || "An error occurred while creating the post."}
//               </div>
//             )}

//             {successMessage && (
//               <div className="bg-green-600 text-white p-4 rounded-md mt-2">
//                 {successMessage}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreatePost;


import React, { useState } from "react";
import { useAuth, INITIAL_USER } from "../../context/AuthContext";
import { useCreatePostMutation } from "../../lib/react-query/createPostMutation";
import {
  Plus,
  Image,
  Video,
  Code,
  Tag,
  List,
  X,
  Link,
  MapPin,
  Upload,
} from "lucide-react";

const CreatePost = () => {
  const { user, isAuthenticated } = useAuth();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");
  const [projectURL, setProjectURL] = useState("");
  const [codeSnippets, setCodeSnippets] = useState("");
  const [location, setLocation] = useState("");
  const [tags, setTags] = useState("");
  const [techStack, setTechStack] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    mutate: createPost,
    isLoading,
    error,
    reset,
  } = useCreatePostMutation();

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = files.filter((file) => file.size < 25 * 1024 * 1024);
    if (validFiles.length !== files.length) {
      alert("Some files were too large and have been ignored.");
    }
    setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    const validFiles = files.filter((file) => file.size < 25 * 1024 * 1024);
    if (validFiles.length !== files.length) {
      alert("Some files were too large and have been ignored.");
    }
    setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const post = {
      caption,
      description,
      projectURL,
      codeSnippets,
      location,
      tags: tags.split(",").map((tag) => tag.trim()),
      techStack: techStack.split(",").map((stack) => stack.trim()),
      files: selectedFiles,
      author: user?.id || INITIAL_USER.id,
    };
    createPost(post, {
      onSuccess: () => {
        setCaption("");
        setDescription("");
        setProjectURL("");
        setCodeSnippets("");
        setLocation("");
        setTags("");
        setTechStack("");
        setSelectedFiles([]);
        setSuccessMessage("Post created successfully!");
        reset();
      },
      onError: (err) => {
        console.error("Error creating post:", err);
        setSuccessMessage("");
      },
    });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#060711] text-white">
      <div className="flex-1 overflow-auto scrollbar-hide p-6">
        <div className="max-w-lg mx-auto w-full mb-20">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Plus size={24} className="text-blue-600" />
            <h2 className="text-xl font-semibold">Create Project Post</h2>
          </div>

          <div className="space-y-6">
            {/* Caption */}
            <textarea
              className="w-full p-3 bg-[#0a0f1f] rounded-lg border border-gray-800 text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none transition-colors"
              placeholder="Project Caption"
              rows="2"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            ></textarea>

            {/* Description */}
            <textarea
              className="w-full p-3 bg-[#0a0f1f] rounded-lg border border-gray-800 text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none transition-colors"
              placeholder="Project Description"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>

            {/* File Upload */}
            <div
              className="p-6 bg-[#0a0f1f] rounded-lg border-2 border-dashed border-gray-700 hover:border-blue-600 transition-colors"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
            >
              <div className="flex justify-center space-x-6 mb-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Image size={20} className="text-gray-400" />
                  </div>
                  <span className="text-xs text-gray-400">Images</span>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Video size={20} className="text-gray-400" />
                  </div>
                  <span className="text-xs text-gray-400">Videos</span>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Code size={20} className="text-gray-400" />
                  </div>
                  <span className="text-xs text-gray-400">Code</span>
                </div>
              </div>

              <button
                type="button"
                className="flex items-center gap-2 mx-auto px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => document.getElementById("fileInput").click()}
              >
                <Upload size={16} />
                Select Files
              </button>
              <input
                id="fileInput"
                type="file"
                multiple
                className="hidden"
                onChange={handleFileChange}
              />

              {/* File Previews */}
              {selectedFiles.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-2">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="relative group">
                      {file.type.startsWith("image/") && (
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`preview ${index}`}
                          className="w-full h-24 object-cover rounded-md"
                        />
                      )}
                      {file.type.startsWith("video/") && (
                        <div className="w-full h-24 bg-gray-800 rounded-md flex items-center justify-center">
                          <Video size={20} className="text-gray-400" />
                        </div>
                      )}
                      <button
                        type="button"
                        className="absolute -top-1 -right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveFile(index)}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Project URL */}
            <div className="relative">
              <Link
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Project URL (GitHub repository)"
                className="w-full pl-10 p-3 bg-[#0a0f1f] rounded-lg border border-gray-800 text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none transition-colors"
                value={projectURL}
                onChange={(e) => setProjectURL(e.target.value)}
              />
            </div>

            {/* Code Snippets */}
            <textarea
              className="w-full p-3 bg-[#0a0f1f] rounded-lg border border-gray-800 text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none font-mono text-sm transition-colors"
              placeholder="Code Snippets"
              rows="6"
              value={codeSnippets}
              onChange={(e) => setCodeSnippets(e.target.value)}
            ></textarea>

            {/* Location */}
            <div className="relative">
              <MapPin
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Add Location"
                className="w-full pl-10 p-3 bg-[#0a0f1f] rounded-lg border border-gray-800 text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none transition-colors"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            {/* Tags */}
            <div className="relative">
              <Tag
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Tags (comma separated)"
                className="w-full pl-10 p-3 bg-[#0a0f1f] rounded-lg border border-gray-800 text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none transition-colors"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>

            {/* Tech Stack */}
            <div className="relative">
              <List
                size={18}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
              <input
                type="text"
                placeholder="Tech Stack (comma separated)"
                className="w-full pl-10 p-3 bg-[#0a0f1f] rounded-lg border border-gray-800 text-white placeholder-gray-500 focus:border-blue-600 focus:outline-none transition-colors"
                value={techStack}
                onChange={(e) => setTechStack(e.target.value)}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors disabled:bg-gray-700 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Posting...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Plus size={18} />
                  Create Post
                </span>
              )}
            </button>

            {/* Error Message */}
            {error && (
              <div className="bg-red-600 text-white p-3 rounded-lg">
                {error.message || "An error occurred while creating the post."}
              </div>
            )}

            {/* Success Message */}
            {successMessage && (
              <div className="bg-blue-600 text-white p-3 rounded-lg">
                {successMessage}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;