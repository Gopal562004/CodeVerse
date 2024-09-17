import axios from "axios";

// Create a new post
export const createPost = async (post) => {
  try {
    const formData = new FormData();
    formData.append("caption", post.caption);
    formData.append("description", post.description);
    formData.append("projectURL", post.projectURL);
    formData.append("codeSnippets", post.codeSnippets);
    formData.append("location", post.location);
    formData.append("tags", JSON.stringify(post.tags)); // Store tags as JSON
    formData.append("techStack", JSON.stringify(post.techStack)); // Store techStack as JSON

    post.files.forEach((file) => {
      formData.append("files", file);
    });

    const response = await axios.post(
      "http://localhost:5000/posts/create-post",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Attach the JWT token
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error creating post:", error); // Log the full error
    throw new Error(error.response?.data?.error || "Error creating post");
  }
};

// Update an existing post
export const updatePost = async (id, post) => {
  try {
    const formData = new FormData();
    formData.append("caption", post.caption);
    formData.append("description", post.description);
    formData.append("projectURL", post.projectURL);
    formData.append("codeSnippets", post.codeSnippets);
    formData.append("location", post.location);
    formData.append("tags", JSON.stringify(post.tags)); // Store tags as JSON
    formData.append("techStack", JSON.stringify(post.techStack)); // Store techStack as JSON

    if (post.files) {
      post.files.forEach((file) => {
        formData.append("files", file);
      });
    }

    const response = await axios.put(
      `http://localhost:5000/posts/${id}`, // Ensure endpoint is correct
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // Attach the JWT token
        },
      }
    );

    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error updating post");
  }
};

// Delete a post
export const deletePost = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/posts/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Attach the JWT token
      },
    });
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error deleting post");
  }
};

// Fetch posts
export const fetchPosts = async () => {
  try {
    const response = await axios.get("http://localhost:5000/posts");
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.error || "Error fetching posts");
  }
};
