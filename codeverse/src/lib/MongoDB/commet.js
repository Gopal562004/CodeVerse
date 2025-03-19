import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // Using environment variable for API URL

// Retrieve token from localStorage
const getToken = () => localStorage.getItem("token");

// Create a new comment
export const createComment = async (postId, content) => {
  try {
    const response = await axios.post(
      `${API_URL}/posts/${postId}/comments`,
      { content },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error.response?.data || error);
    throw error;
  }
};

// Get all comments for a post
export const getComments = async (postId) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${postId}/comments`);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error.response?.data || error);
    throw error;
  }
};

// Update a comment
export const updateComment = async (commentId, content) => {
  try {
    const response = await axios.put(
      `${API_URL}/comments/${commentId}`,
      { content },
      {
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating comment:", error.response?.data || error);
    throw error;
  }
};

// Delete a comment
export const deleteComment = async (commentId) => {
  try {
    const response = await axios.delete(`${API_URL}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting comment:", error.response?.data || error);
    throw error;
  }
};
